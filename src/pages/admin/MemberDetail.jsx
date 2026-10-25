import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import LedgerTable from '../../components/admin/LedgerTable';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import ReturnDialog from '../../components/admin/ReturnDialog';
import ResetPasswordDialog from '../../components/admin/ResetPasswordDialog';
import StatusDot from '../../components/admin/StatusDot';
import WaiveDialog from '../../components/admin/WaiveDialog';
import {
  formatDate,
  loanStatus,
  memberLine,
  pad,
  rupees,
  studentSummary,
  useLibrary,
} from '../../context/LibraryContext';
import { memberStatus } from './Members';

export default function MemberDetail() {
  const { id } = useParams();
  const { state, getStudent, getBook, sendReminder, setMemberStatus, markFinePaid } = useLibrary();

  const [dialog, setDialog] = useState(null); // { kind: 'status' | 'return' | 'waive' | 'paid', item }
  const [notice, setNotice] = useState('');

  const member = getStudent(id);
  if (!member) {
    return (
      <main className="ad-main">
        <title>Member not found | BookVerse Admin</title>
        <div className="ad-empty">
          <h2>Member not found</h2>
          <p>There is no member with the ID “{id}”.</p>
          <Link to="/admin/members" className="btn">
            Back to members
          </Link>
        </div>
      </main>
    );
  }

  const summary = studentSummary(state, member.id);
  const status = memberStatus(summary, member);
  const suspended = member.status === 'suspended';
  const loans = state.loans.filter((l) => l.studentId === member.id);
  const history = state.history.filter((h) => h.studentId === member.id);
  const fines = state.fines.filter((f) => f.studentId === member.id);

  const loanColumns = [
    {
      key: 'book',
      label: 'Book',
      title: true,
      render: (loan) => (
        <>
          <strong>{getBook(loan.bookId).title}</strong>
          <small>{getBook(loan.bookId).author}</small>
        </>
      ),
    },
    { key: 'issued', label: 'Issued', render: (loan) => formatDate(loan.issuedOn) },
    { key: 'due', label: 'Due', render: (loan) => formatDate(loan.dueOn) },
    {
      key: 'status',
      label: 'Status',
      render: (loan) => {
        const s = loanStatus(loan);
        return <StatusDot tone={s.overdue ? 'bad' : 'good'}>{s.label}</StatusDot>;
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (loan) => (
        <>
          {loanStatus(loan).overdue && (
            <button
              type="button"
              className="btn btn-sm"
              disabled={Boolean(loan.remindedOn)}
              onClick={() => sendReminder(loan.id)}
            >
              {loan.remindedOn ? 'Reminded' : 'Remind'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm"
            aria-label={`Return ${getBook(loan.bookId).title}`}
            onClick={() => setDialog({ kind: 'return', item: loan })}
          >
            Return
          </button>
        </>
      ),
    },
  ];

  const fineColumns = [
    {
      key: 'book',
      label: 'Book',
      title: true,
      render: (fine) => getBook(fine.bookId).title,
    },
    { key: 'reason', label: 'Reason', render: (fine) => `${fine.reason} · ${fine.days} d` },
    { key: 'amount', label: 'Amount', num: true, render: (fine) => rupees(fine.amount) },
    {
      key: 'status',
      label: 'Status',
      render: (fine) =>
        fine.status === 'due' ? (
          <StatusDot tone="bad">Unpaid</StatusDot>
        ) : fine.status === 'paid' ? (
          <StatusDot tone="good">Paid</StatusDot>
        ) : (
          <StatusDot tone="neutral">Waived</StatusDot>
        ),
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (fine) =>
        fine.status === 'due' && (
          <>
            <button type="button" className="btn btn-sm" onClick={() => setDialog({ kind: 'paid', item: fine })}>
              Mark paid
            </button>
            <button type="button" className="btn btn-sm" onClick={() => setDialog({ kind: 'waive', item: fine })}>
              Waive
            </button>
          </>
        ),
    },
  ];

  const historyColumns = [
    { key: 'book', label: 'Book', title: true, render: (h) => getBook(h.bookId).title },
    { key: 'issued', label: 'Issued', render: (h) => formatDate(h.issuedOn) },
    { key: 'returned', label: 'Returned', render: (h) => formatDate(h.returnedOn) },
    { key: 'fine', label: 'Fine', num: true, render: (h) => (h.fine ? rupees(h.fine) : '—') },
  ];

  const figures = [
    ['Active loans', pad(summary.active)],
    ['Overdue', pad(summary.overdue)],
    ['Fines due', rupees(summary.finesDue)],
    ['Loans to date', pad(summary.totalLoans)],
  ];

  return (
    <>
      <title>{member.name} | BookVerse Admin</title>
      <meta name="description" content="Member record." />
      <main className="ad-main">
        <PageHeader
          title={member.name}
          meta={
            <>
              <span className="mono">{member.id}</span> · {memberLine(member)} ·{' '}
              <StatusDot tone={status.tone}>{status.label}</StatusDot>
            </>
          }
        >
          <Link to="/admin/members" className="btn">
            All members
          </Link>
          <button
            type="button"
            className={`btn${suspended ? ' btn-primary' : ' btn-danger'}`}
            onClick={() => setDialog({ kind: 'status', item: member })}
          >
            {suspended ? 'Reactivate' : 'Suspend'}
          </button>
          <button type="button" className="btn" onClick={() => setDialog({ kind: 'reset', item: member })}>
            Reset password
          </button>
        </PageHeader>

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <section className="figures" aria-label="Member totals">
          {figures.map(([label, value]) => (
            <div className="figure" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>Current loans</h2>
          </div>
          <LedgerTable
            columns={loanColumns}
            rows={loans}
            rowKey={(loan) => loan.id}
            empty={<strong>No books on loan.</strong>}
          />
        </section>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>Fines</h2>
          </div>
          <LedgerTable
            columns={fineColumns}
            rows={fines}
            rowKey={(fine) => fine.id}
            empty={<strong>No fines on record.</strong>}
          />
        </section>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>Details</h2>
          </div>
          <dl className="dl">
            <dt>Email</dt>
            <dd>{member.email}</dd>
            <dt>Phone</dt>
            <dd className="mono">{member.phone}</dd>
            <dt>Department</dt>
            <dd>{memberLine(member)}</dd>
            <dt>Joined</dt>
            <dd>{member.joinedOn ? formatDate(member.joinedOn) : '—'}</dd>
          </dl>
        </section>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>History</h2>
            <span className="muted">{history.length} returned</span>
          </div>
          <LedgerTable
            columns={historyColumns}
            rows={history}
            rowKey={(h) => h.id}
            empty={<strong>Nothing returned yet.</strong>}
          />
        </section>
      </main>

      {dialog?.kind === 'status' && (
        <ConfirmDialog
          title={suspended ? `Reactivate ${member.name}?` : `Suspend ${member.name}?`}
          confirmLabel={suspended ? 'Reactivate' : 'Suspend member'}
          danger={!suspended}
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            setMemberStatus(member.id, suspended ? 'active' : 'suspended');
            setNotice(`${suspended ? 'Reactivated' : 'Suspended'} ${member.name}.`);
            setDialog(null);
          }}
        >
          <p>
            {suspended
              ? 'They will be able to borrow and reserve books again.'
              : 'They will not be able to borrow or reserve books until reactivated.'}
          </p>
        </ConfirmDialog>
      )}

      {dialog?.kind === 'reset' && (
        <ResetPasswordDialog
          person={member}
          onCancel={() => setDialog(null)}
          onDone={(message) => {
            setDialog(null);
            setNotice(message);
          }}
        />
      )}

      {dialog?.kind === 'return' && (
        <ReturnDialog
          loan={dialog.item}
          onClose={(done) => {
            setDialog(null);
            if (done) {
              setNotice(
                `Returned “${done.book}”${done.fine ? ` with a fine of ${rupees(done.fine)}` : ''}.`,
              );
            }
          }}
        />
      )}

      {dialog?.kind === 'paid' && (
        <ConfirmDialog
          title={`Mark ${rupees(dialog.item.amount)} as paid?`}
          confirmLabel="Mark paid"
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            markFinePaid(dialog.item.id);
            setNotice(`Recorded ${rupees(dialog.item.amount)} paid.`);
            setDialog(null);
          }}
        >
          <p>This records that {member.name} has paid the fine in full.</p>
        </ConfirmDialog>
      )}

      {dialog?.kind === 'waive' && (
        <WaiveDialog
          fine={dialog.item}
          onClose={(waived) => {
            if (waived) setNotice(`Waived ${rupees(dialog.item.amount)}.`);
            setDialog(null);
          }}
        />
      )}
    </>
  );
}
