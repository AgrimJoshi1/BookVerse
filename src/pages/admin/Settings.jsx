import { useState } from 'react';
import Field from '../../components/admin/Field';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import { ApiError, plural, rupees, useLibrary, validateSettings } from '../../context/LibraryContext';

const toDraft = (settings) => ({
  loanDays: String(settings.loanDays),
  maxBooks: String(settings.maxBooks),
  fineRate: String(settings.fineRate),
  graceDays: String(settings.graceDays),
  maxRenewals: String(settings.maxRenewals),
  holdDays: String(settings.holdDays),
  library: { ...settings.library },
  departments: { student: [...settings.departments.student], staff: [...settings.departments.staff] },
});

// One editable list of department names: chips with a remove button, plus an add box.
function DepartmentList({ title, hint, names, onChange }) {
  const [text, setText] = useState('');
  const name = text.trim();
  const exists = names.some((n) => n.toLowerCase() === name.toLowerCase());

  function add() {
    if (!name || exists) return;
    onChange([...names, name]);
    setText('');
  }

  return (
    <div className="dept-list wide">
      <h3>{title}</h3>
      <p className="field-hint">{hint}</p>
      <ul className="chips">
        {names.map((n) => (
          <li key={n}>
            {n}
            <button type="button" aria-label={`Remove ${n}`} onClick={() => onChange(names.filter((x) => x !== n))}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="chip-add">
        <input
          className="ad-input"
          placeholder="Add a department"
          aria-label={`Add a ${title.toLowerCase()}`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="btn" disabled={!name || exists} onClick={add}>
          Add
        </button>
      </div>
    </div>
  );
}

// Every field here is a live rule: saving changes what the student and
// librarian areas allow straight away.
export default function Settings() {
  const { settings, updateSettings } = useLibrary();
  const [draft, setDraft] = useState(() => toDraft(settings));
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const rule = (key, label, effect, extra) => (
    <Field
      id={`set-${key}`}
      label={label}
      type="number"
      min="0"
      value={draft[key]}
      onChange={(event) => {
        setDraft({ ...draft, [key]: event.target.value });
        setSaved(false);
      }}
      error={errors[key]}
      hint={effect}
      {...extra}
    />
  );
  const identity = (key, label, extra) => (
    <Field
      id={`set-${key}`}
      label={label}
      value={draft.library[key]}
      onChange={(event) => {
        setDraft({ ...draft, library: { ...draft.library, [key]: event.target.value } });
        setSaved(false);
      }}
      error={errors[key]}
      {...extra}
    />
  );

  const num = (key) => Number(draft[key]);
  const valid = (key) => !errors[key] && draft[key].trim() !== '' && Number.isFinite(num(key));

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await updateSettings(draft);
      setErrors({});
      setSaved(true);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setErrors(error.fields);
      setSaved(false);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setDraft(toDraft(settings));
    setErrors({});
    setSaved(false);
  }

  const preview = validateSettings(draft);

  return (
    <>
      <title>Settings | BookVerse Admin</title>
      <meta name="description" content="Borrowing rules and library details." />
      <main className="ad-main">
        <PageHeader title="Settings" meta="Rules apply to every student and librarian as soon as you save." />

        {saved && (
          <Notice tone="good" onClose={() => setSaved(false)}>
            Saved. The new rules are in effect now.
          </Notice>
        )}

        <form className="ad-form" onSubmit={save} noValidate>
          <h2 className="form-group-title">Borrowing rules</h2>
          <div className="form-grid">
            {rule(
              'loanDays',
              'Loan period (days)',
              !preview.loanDays && valid('loanDays')
                ? `New loans are due ${plural(num('loanDays'), 'day')} after issue. Renewals add the same.`
                : 'Applies to new loans and renewals.',
              { min: '1' },
            )}
            {rule(
              'maxBooks',
              'Books per member',
              !preview.maxBooks && valid('maxBooks')
                ? `A member can hold ${plural(num('maxBooks'), 'book')} at a time.`
                : undefined,
              { min: '1' },
            )}
            {rule(
              'fineRate',
              'Fine per day (₹)',
              !preview.fineRate && valid('fineRate')
                ? `${rupees(num('fineRate'))} for each chargeable day late, charged on return.`
                : undefined,
            )}
            {rule(
              'graceDays',
              'Grace period (days)',
              !preview.graceDays && valid('graceDays')
                ? num('graceDays') === 0
                  ? 'Fines start the day after the due date.'
                  : `No fine until a book is ${plural(num('graceDays') + 1, 'day')} late.`
                : undefined,
            )}
            {rule(
              'maxRenewals',
              'Renewals per loan',
              !preview.maxRenewals && valid('maxRenewals')
                ? num('maxRenewals') === 0
                  ? 'Renewing is switched off.'
                  : `Each loan can be renewed ${plural(num('maxRenewals'), 'time')}.`
                : undefined,
            )}
            {rule(
              'holdDays',
              'Reserved copy held for (days)',
              !preview.holdDays && valid('holdDays')
                ? `A reserved book waits ${plural(num('holdDays'), 'day')} at the desk.`
                : 'Applies to new holds.',
              { min: '1' },
            )}
          </div>

          <h2 className="form-group-title">Library details</h2>
          <div className="form-grid">
            {identity('name', 'Library name', { className: 'wide' })}
            {identity('address', 'Address', { className: 'wide' })}
            {identity('email', 'Email', { type: 'email' })}
            {identity('phone', 'Phone')}
            {identity('hours', 'Opening hours', { className: 'wide' })}
          </div>

          <h2 className="form-group-title">Departments</h2>
          <div className="form-grid">
            <DepartmentList
              title="Student departments"
              hint="Shown in the Department dropdown on Register and Add member. Students can also write in their own."
              names={draft.departments.student}
              onChange={(student) => {
                setDraft({ ...draft, departments: { ...draft.departments, student } });
                setSaved(false);
              }}
            />
            <DepartmentList
              title="Staff departments"
              hint="Shown when an admin adds a librarian or admin."
              names={draft.departments.staff}
              onChange={(staff) => {
                setDraft({ ...draft, departments: { ...draft.departments, staff } });
                setSaved(false);
              }}
            />
            {errors.departments && (
              <p className="field-error wide" role="alert">
                {errors.departments}
              </p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving…' : 'Save settings'}
            </button>
            <button type="button" className="btn" onClick={reset}>
              Discard changes
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
