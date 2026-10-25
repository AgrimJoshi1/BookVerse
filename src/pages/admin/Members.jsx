import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Field from '../../components/admin/Field';
import FormDialog from '../../components/admin/FormDialog';
import LedgerTable from '../../components/admin/LedgerTable';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import Pager from '../../components/admin/Pager';
import DepartmentField from '../../components/admin/DepartmentField';
import ResetPasswordDialog from '../../components/admin/ResetPasswordDialog';
import StatusDot from '../../components/admin/StatusDot';
import usePaging from '../../components/admin/usePaging';
import PasswordChecklist from '../../components/PasswordChecklist';
import {
  ApiError,
  YEARS,
  formatDate,
  memberLine,
  studentSummary,
  useLibrary,
} from '../../context/LibraryContext';
import { downloadCsv } from '../../utils/csv';

const PAGE_SIZE = 10;
const BLANK = { name: '', email: '', phone: '', department: '', year: '', password: '' };

export function memberStatus(summary, member) {
  if (member.status === 'pending') return { tone: 'warn', label: 'Pending approval' };
  if (member.status === 'suspended') return { tone: 'bad', label: 'Suspended' };
  if (summary.overdue) return { tone: 'warn', label: 'Overdue' };
  return { tone: 'good', label: 'Active' };
}

export default function Members() {
  const { state, students, settings, addMember, setMemberStatus, approveMember, rejectMember } = useLibrary();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [department, setDepartment] = useState('all');
  const [resetting, setResetting] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const rows = students.map((member) => ({ member, summary: studentSummary(state, member.id) }));
  const filters = [
    ['all', 'All', rows.length],
    ['pending', 'Pending', rows.filter((r) => r.member.status === 'pending').length],
    ['active', 'Active', rows.filter((r) => r.member.status === 'active').length],
    ['suspended', 'Suspended', rows.filter((r) => r.member.status === 'suspended').length],
    ['overdue', 'With overdue', rows.filter((r) => r.summary.overdue > 0).length],
  ];

  const needle = query.trim().toLowerCase();
  const filtered = rows.filter(
    ({ member, summary }) =>
      (filter === 'all' ||
        (filter === 'pending' && member.status === 'pending') ||
        (filter === 'active' && member.status === 'active') ||
        (filter === 'suspended' && member.status === 'suspended') ||
        (filter === 'overdue' && summary.overdue > 0)) &&
      (department === 'all' || member.department === department) &&
      (!needle || [member.name, member.id, member.email].some((t) => t.toLowerCase().includes(needle))),
  );
  const paging = usePaging(filtered, PAGE_SIZE, `${needle}|${filter}|${department}`);

  // the configured list, plus any written-in department members actually use
  const departments = [
    ...new Set([...settings.departments.student, ...students.map((s) => s.department).filter(Boolean)]),
  ];

  const columns = [
    {
      key: 'name',
      label: 'Member',
      title: true,
      render: ({ member }) => (
        <>
          <strong>{member.name}</strong>
          <small>{memberLine(member)}</small>
        </>
      ),
    },
    { key: 'id', label: 'ID', mono: true, render: ({ member }) => member.id },
    { key: 'email', label: 'Email', render: ({ member }) => member.email },
    {
      key: 'joined',
      label: 'Joined',
      render: ({ member }) => (member.joinedOn ? formatDate(member.joinedOn) : '—'),
    },
    { key: 'loans', label: 'Loans', num: true, render: ({ summary }) => summary.active },
    {
      key: 'status',
      label: 'Status',
      render: ({ member, summary }) => {
        const status = memberStatus(summary, member);
        return <StatusDot tone={status.tone}>{status.label}</StatusDot>;
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: ({ member }) =>
        member.status === 'pending' ? (
          <>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              aria-label={`Approve ${member.name}`}
              onClick={() => setToggling({ ...member, approving: true })}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              aria-label={`Decline ${member.name}`}
              onClick={() => setToggling({ ...member, declining: true })}
            >
              Decline
            </button>
          </>
        ) : (
        <>
          <Link to={`/admin/members/${member.id}`} className="btn btn-sm" aria-label={`View ${member.name}`}>
            View
          </Link>
          <button
            type="button"
            className={`btn btn-sm${member.status === 'suspended' ? '' : ' btn-danger'}`}
            aria-label={`${member.status === 'suspended' ? 'Reactivate' : 'Suspend'} ${member.name}`}
            onClick={() => setToggling(member)}
          >
            {member.status === 'suspended' ? 'Reactivate' : 'Suspend'}
          </button>
          <button
            type="button"
            className="btn btn-sm"
            aria-label={`Reset password for ${member.name}`}
            onClick={() => setResetting(member)}
          >
            Reset password
          </button>
        </>
        ),
    },
  ];

  function exportCsv() {
    downloadCsv(
      'members.csv',
      [
        { label: 'ID', value: (r) => r.member.id },
        { label: 'Name', value: (r) => r.member.name },
        { label: 'Department', value: (r) => r.member.department ?? r.member.class ?? '' },
        { label: 'Year', value: (r) => r.member.year ?? '' },
        { label: 'Email', value: (r) => r.member.email },
        { label: 'Phone', value: (r) => r.member.phone },
        { label: 'Joined', value: (r) => r.member.joinedOn ?? '' },
        { label: 'Active loans', value: (r) => r.summary.active },
        { label: 'Status', value: (r) => memberStatus(r.summary, r.member).label },
      ],
      filtered,
    );
  }

  function openAdd() {
    setDraft(BLANK);
    setErrors({});
    setAdding(true);
  }

  async function submitAdd() {
    setBusy(true);
    try {
      await addMember(draft);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setErrors(error.fields);
      return;
    } finally {
      setBusy(false);
    }
    setAdding(false);
    setNotice(`Added ${draft.name.trim()} as a member.`);
  }

  const field = (key, label, extra) => (
    <Field
      id={`member-${key}`}
      label={label}
      value={draft[key]}
      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
      error={errors[key]}
      {...extra}
    />
  );

  const suspending = toggling?.status === 'active';

  return (
    <>
      <title>Members | BookVerse Admin</title>
      <meta name="description" content="Manage library members." />
      <main className="ad-main">
        <PageHeader
          title="Members"
          meta={
            <>
              <span className="mono">{students.length}</span> members ·{' '}
              <span className="mono">{filters[2][2]}</span> suspended
            </>
          }
        >
          <button type="button" className="btn" onClick={exportCsv}>
            Export CSV
          </button>
          <button type="button" className="btn btn-primary" onClick={openAdd}>
            Add member
          </button>
        </PageHeader>

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <div className="ad-toolbar">
          <input
            type="search"
            className="ad-input"
            placeholder="Search name, ID or email"
            aria-label="Search members"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="ad-select"
            aria-label="Filter by department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="all">All departments</option>
            {departments.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="ad-tabs">
            {filters.map(([value, label, count]) => (
              <button
                type="button"
                key={value}
                className={`ad-tab${filter === value ? ' on' : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
                <span className="mono">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <LedgerTable
          columns={columns}
          rows={paging.rows}
          rowKey={({ member }) => member.id}
          empty={
            <>
              <strong>No members match.</strong>
              Try a different search or filter.
            </>
          }
        />
        <Pager {...paging} onPage={paging.setPage} />
      </main>

      {toggling && (
        <ConfirmDialog
          title={
            toggling.approving
              ? `Approve ${toggling.name}?`
              : toggling.declining
                ? `Decline ${toggling.name}?`
                : suspending
                  ? `Suspend ${toggling.name}?`
                  : `Reactivate ${toggling.name}?`
          }
          confirmLabel={
            toggling.approving
              ? 'Approve'
              : toggling.declining
                ? 'Decline sign-up'
                : suspending
                  ? 'Suspend member'
                  : 'Reactivate'
          }
          danger={suspending || toggling.declining}
          onCancel={() => setToggling(null)}
          onConfirm={async () => {
            if (toggling.approving) await approveMember(toggling.id);
            else if (toggling.declining) await rejectMember(toggling.id);
            else await setMemberStatus(toggling.id, suspending ? 'suspended' : 'active');
            setNotice(
              `${toggling.approving ? 'Approved' : toggling.declining ? 'Declined the sign-up of' : suspending ? 'Suspended' : 'Reactivated'} ${toggling.name}.`,
            );
            setToggling(null);
          }}
        >
          <p>
            {toggling.approving
              ? 'They will be able to log in and borrow books straight away.'
              : toggling.declining
                ? 'The account is removed. They can register again if this was a mistake.'
                : suspending
                  ? 'They will not be able to log in, borrow or reserve books until reactivated. Books already on loan stay out.'
                  : 'They will be able to log in and borrow books again.'}
          </p>
        </ConfirmDialog>
      )}

      {adding && (
        <FormDialog
          title="Add member"
          submitLabel={busy ? 'Adding…' : 'Add member'}
          onSubmit={submitAdd}
          onCancel={() => setAdding(false)}
        >
          {field('name', 'Full name', { autoFocus: true })}
          {field('email', 'Email', { type: 'email' })}
          {field('phone', 'Phone')}
          <DepartmentField
            id="member-department"
            options={settings.departments.student}
            value={draft.department}
            onChange={(value) => setDraft({ ...draft, department: value })}
            error={errors.department}
          />
          {field('year', 'Year', {
            as: 'select',
            children: (
              <>
                <option value="">Choose year</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </>
            ),
          })}
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
