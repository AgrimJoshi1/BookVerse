import { useState } from 'react';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Field from '../../components/admin/Field';
import FormDialog from '../../components/admin/FormDialog';
import LedgerTable from '../../components/admin/LedgerTable';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import DepartmentField from '../../components/admin/DepartmentField';
import ResetPasswordDialog from '../../components/admin/ResetPasswordDialog';
import StatusDot from '../../components/admin/StatusDot';
import PasswordChecklist from '../../components/PasswordChecklist';
import { ApiError, formatDate, useLibrary } from '../../context/LibraryContext';

const ROLES = [
  ['librarian', 'Librarian'],
  ['admin', 'Admin'],
];
const BLANK = { name: '', email: '', role: 'librarian', department: '', password: '' };

export default function Staff() {
  const { staff, me, settings, addStaff, updateStaffRole, setStaffStatus } = useLibrary();

  const [resetting, setResetting] = useState(null);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const [toggling, setToggling] = useState(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const needle = query.trim().toLowerCase();
  const shown = staff.filter(
    (m) =>
      (role === 'all' || m.role === role) &&
      (!needle || [m.name, m.id, m.email, m.department].some((t) => t.toLowerCase().includes(needle))),
  );
  const active = staff.filter((m) => m.status === 'active').length;

  const columns = [
    {
      key: 'name',
      label: 'Name',
      title: true,
      render: (m) => (
        <>
          <strong>{m.name}</strong>
          <small>{m.email}</small>
        </>
      ),
    },
    { key: 'id', label: 'ID', mono: true },
    {
      key: 'role',
      label: 'Role',
      render: (m) =>
        m.id === me.id ? (
          <>
            Admin <span className="faint">(you)</span>
          </>
        ) : (
          <select
            className="ad-select role-select"
            aria-label={`Role for ${m.name}`}
            value={m.role}
            onChange={(event) => {
              updateStaffRole(m.id, event.target.value);
              setNotice(`${m.name} is now ${event.target.value === 'admin' ? 'an admin' : `a ${event.target.value}`}.`);
            }}
          >
            {ROLES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        ),
    },
    { key: 'department', label: 'Department' },
    { key: 'added', label: 'Added', render: (m) => formatDate(m.addedOn) },
    {
      key: 'status',
      label: 'Status',
      render: (m) =>
        m.status === 'active' ? (
          <StatusDot tone="good">Active</StatusDot>
        ) : (
          <StatusDot tone="neutral">Deactivated</StatusDot>
        ),
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (m) =>
        m.id === me.id ? (
          <span className="faint">Signed in</span>
        ) : (
          <>
            <button
              type="button"
              className={`btn btn-sm${m.status === 'active' ? ' btn-danger' : ''}`}
              aria-label={`${m.status === 'active' ? 'Deactivate' : 'Reactivate'} ${m.name}`}
              onClick={() => setToggling(m)}
            >
              {m.status === 'active' ? 'Deactivate' : 'Reactivate'}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              aria-label={`Reset password for ${m.name}`}
              onClick={() => setResetting(m)}
            >
              Reset password
            </button>
          </>
        ),
    },
  ];

  function openAdd() {
    setDraft(BLANK);
    setErrors({});
    setAdding(true);
  }

  async function submitAdd() {
    setBusy(true);
    try {
      await addStaff(draft);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setErrors(error.fields);
      return;
    } finally {
      setBusy(false);
    }
    setAdding(false);
    setNotice(`Added ${draft.name.trim()} as ${draft.role === 'admin' ? 'an admin' : `a ${draft.role}`}.`);
  }

  const field = (key, label, extra) => (
    <Field
      id={`staff-${key}`}
      label={label}
      value={draft[key]}
      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
      error={errors[key]}
      {...extra}
    />
  );

  const deactivating = toggling?.status === 'active';

  return (
    <>
      <title>Staff | BookVerse Admin</title>
      <meta name="description" content="Manage library staff accounts and roles." />
      <main className="ad-main">
        <PageHeader
          title="Staff"
          meta={
            <>
              <span className="mono">{staff.length}</span> accounts · <span className="mono">{active}</span> active
            </>
          }
        >
          <button type="button" className="btn btn-primary" onClick={openAdd}>
            Add staff
          </button>
        </PageHeader>

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <div className="ad-toolbar">
          <input
            type="search"
            className="ad-input"
            placeholder="Search name, ID or department"
            aria-label="Search staff"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="ad-tabs">
            {[['all', 'All'], ...ROLES.map(([value, label]) => [value, `${label}s`])].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={`ad-tab${role === value ? ' on' : ''}`}
                onClick={() => setRole(value)}
              >
                {label}
                <span className="mono">
                  {value === 'all' ? staff.length : staff.filter((m) => m.role === value).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <LedgerTable
          columns={columns}
          rows={shown}
          rowKey={(m) => m.id}
          empty={
            <>
              <strong>No staff match.</strong>
              Try a different search or role.
            </>
          }
        />
      </main>

      {toggling && (
        <ConfirmDialog
          title={deactivating ? `Deactivate ${toggling.name}?` : `Reactivate ${toggling.name}?`}
          confirmLabel={deactivating ? 'Deactivate' : 'Reactivate'}
          danger={deactivating}
          onCancel={() => setToggling(null)}
          onConfirm={() => {
            setStaffStatus(toggling.id, deactivating ? 'inactive' : 'active');
            setNotice(`${deactivating ? 'Deactivated' : 'Reactivated'} ${toggling.name}.`);
            setToggling(null);
          }}
        >
          <p>
            {deactivating
              ? 'The account stays on record but is marked as no longer active.'
              : 'The account is marked active again.'}
          </p>
        </ConfirmDialog>
      )}

      {adding && (
        <FormDialog title="Add staff" submitLabel={busy ? 'Adding…' : 'Add staff'} onSubmit={submitAdd} onCancel={() => setAdding(false)}>
          {field('name', 'Full name', { autoFocus: true })}
          {field('email', 'Email', { type: 'email' })}
          <Field
            as="select"
            id="staff-role"
            label="Role"
            value={draft.role}
            onChange={(event) => setDraft({ ...draft, role: event.target.value })}
          >
            {ROLES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Field>
          <DepartmentField
            id="staff-department"
            options={settings.departments.staff}
            value={draft.department}
            onChange={(value) => setDraft({ ...draft, department: value })}
            error={errors.department}
          />
          {field('password', 'Temporary password', {
            type: 'text',
            placeholder: 'Create a strong password',
            hint: 'They must choose their own at first login.',
          })}
          <PasswordChecklist value={draft.password} />
        </FormDialog>
      )}

      {resetting && (
        <ResetPasswordDialog
          person={resetting}
          onCancel={() => setResetting(null)}
          onDone={(message) => {
            setResetting(null);
            setNotice(message);
          }}
        />
      )}
    </>
  );
}
