import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/admin/PageHeader';
import {
  accruingTotal,
  daysUntil,
  formatDate,
  loanStatus,
  monthDay,
  pad,
  plural,
  rupees,
  useLibrary,
} from '../../context/LibraryContext';
import { today } from '../../api/engine';

const SHOWN = 12;

export default function Dashboard() {
  const { state, books, students, staff, activity, getBook, getStudent, sendReminder, approveMember, settings, unreadMessages } =
    useLibrary();
  const [showAll, setShowAll] = useState(false);

  const copies = books.reduce((sum, book) => sum + book.copies, 0);
  const overdue = state.loans.filter((loan) => daysUntil(loan.dueOn) < 0);
  const total = (status) =>
    state.fines.filter((f) => f.status === status).reduce((sum, f) => sum + f.amount, 0);
  const pendingMembers = students.filter((s) => s.status === 'pending');
  const unpaid = state.fines.filter((f) => f.status === 'due');
  const expiring = state.reservations.filter(
    (r) => r.status === 'ready' && daysUntil(r.expiresOn) <= 2,
  );

  const figures = [
    { label: 'Titles', value: pad(books.length) },
    { label: 'Copies owned', value: copies },
    { label: 'Members', value: students.length },
    { label: 'Active staff', value: staff.filter((m) => m.status === 'active').length },
    { label: 'On loan now', value: pad(state.loans.length) },
    { label: 'Overdue', value: pad(overdue.length), bad: overdue.length > 0 },
    { label: 'Fines collected', value: rupees(total('paid')) },
    {
      label: 'Fines outstanding',
      value: rupees(total('due')),
      bad: total('due') > 0,
      note: accruingTotal(state) > 0 ? `+ ${rupees(accruingTotal(state))} accruing` : '',
    },
  ];

  const entries = showAll ? activity : activity.slice(0, SHOWN);

  return (
    <>
      <title>Dashboard | BookVerse Admin</title>
      <meta name="description" content="Library-wide overview for BookVerse administrators." />
      <main className="ad-main">
        <PageHeader
          title="Dashboard"
          meta={
            <>
              {settings.library.name} · <span className="mono">{formatDate(today())}</span>
            </>
          }
        >
          <Link to="/admin/add-book" className="btn btn-primary">
            Add book
          </Link>
          <Link to="/admin/reports" className="btn">
            Reports
          </Link>
        </PageHeader>

        <section className="figures" aria-label="Library totals">
          {figures.map((figure) => (
            <div className={`figure${figure.bad ? ' bad' : ''}`} key={figure.label}>
              <span>{figure.label}</span>
              <strong>{figure.value}</strong>
              {figure.note && <small>{figure.note}</small>}
            </div>
          ))}
        </section>

        <div className="ad-cols ad-section">
          <section aria-labelledby="log-title">
            <div className="ad-section-head">
              <h2 id="log-title">Activity log</h2>
              <span className="muted">{plural(activity.length, 'entry', 'entries')}</span>
            </div>
            <ul className="log">
              {entries.map((entry) => {
                const { month, day } = monthDay(entry.on);
                return (
                  <li key={entry.id}>
                    <time dateTime={entry.on}>
                      {day} {month.charAt(0) + month.slice(1).toLowerCase()}
                    </time>
                    <div>
                      {entry.text}
                      <small>{entry.actor}</small>
                    </div>
                  </li>
                );
              })}
            </ul>
            {activity.length > SHOWN && (
              <p className="log-more">
                <button type="button" className="ad-link" onClick={() => setShowAll(!showAll)}>
                  {showAll ? 'Show fewer' : `Show all ${activity.length}`}
                </button>
              </p>
            )}
          </section>

          <aside>
            <div className="ad-section-head">
              <h2>Needs attention</h2>
            </div>

            <div className="attn-group">
              <h3>Waiting for approval ({pendingMembers.length})</h3>
              {pendingMembers.length === 0 ? (
                <p className="muted attn-empty">No sign-ups are waiting.</p>
              ) : (
                <ul className="attn">
                  {pendingMembers.slice(0, 5).map((member) => (
                    <li key={member.id}>
                      <div>
                        {member.name}
                        <small>{member.email}</small>
                      </div>
                      <button type="button" className="btn btn-sm btn-primary" onClick={() => approveMember(member.id)}>
                        Approve
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="attn-group">
              <h3>Overdue loans ({overdue.length})</h3>
              {overdue.length === 0 ? (
                <p className="muted attn-empty">Nothing is overdue.</p>
              ) : (
                <ul className="attn">
                  {overdue.slice(0, 5).map((loan) => (
                    <li key={loan.id}>
                      <div>
                        <Link to={`/admin/members/${loan.studentId}`} className="ad-link">
                          {getStudent(loan.studentId).name}
                        </Link>
                        <small>
                          {getBook(loan.bookId).title} · {loanStatus(loan).label}
                        </small>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm"
                        disabled={Boolean(loan.remindedOn)}
                        onClick={() => sendReminder(loan.id)}
                      >
                        {loan.remindedOn ? 'Reminded' : 'Remind'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {overdue.length > 5 && (
                <p className="log-more">
                  <Link to="/admin/transactions?status=overdue" className="ad-link">
                    All {overdue.length} overdue loans
                  </Link>
                </p>
              )}
            </div>

            <div className="attn-group">
              <h3>Holds expiring ({expiring.length})</h3>
              {expiring.length === 0 ? (
                <p className="muted attn-empty">No holds are about to lapse.</p>
              ) : (
                <ul className="attn">
                  {expiring.map((r) => (
                    <li key={r.id}>
                      <div>
                        {getStudent(r.studentId).name}
                        <small>
                          {getBook(r.bookId).title} · until {formatDate(r.expiresOn)}
                        </small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="attn-group">
              <h3>Unread messages ({unreadMessages})</h3>
              <p className="attn-empty">
                {unreadMessages === 0 ? (
                  <span className="muted">Your inbox is clear.</span>
                ) : (
                  <>
                    {plural(unreadMessages, 'message')} from the contact form.{' '}
                    <Link to="/admin/messages" className="ad-link">
                      Open inbox
                    </Link>
                  </>
                )}
              </p>
            </div>

            <div className="attn-group">
              <h3>Unpaid fines</h3>
              <p className="attn-empty">
                <span className="mono">{rupees(total('due'))}</span> across {plural(unpaid.length, 'fine')}.{' '}
                <Link to="/admin/fines?status=due" className="ad-link">
                  Review
                </Link>
              </p>
            </div>

            <div className="ad-section-head shortcuts">
              <h2>Shortcuts</h2>
            </div>
            <ul className="quick">
              <li>
                <Link to="/admin/add-book">Add a book</Link>
              </li>
              <li>
                <Link to="/admin/members">Add a member</Link>
              </li>
              <li>
                <Link to="/admin/staff">Add staff</Link>
              </li>
              <li>
                <Link to="/admin/reports">Monthly report</Link>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </>
  );
}
