import { Link } from 'react-router-dom';
import LedgerTable from '../../components/admin/LedgerTable';
import PageHeader from '../../components/admin/PageHeader';
import { today } from '../../api/engine';
import { loanStatus, plural, rupees, useLibrary } from '../../context/LibraryContext';
import { downloadCsv } from '../../utils/csv';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// [[key, count], ...] biggest first, ties broken by key so the order is stable.
function tally(keys) {
  const counts = new Map();
  for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
}

export default function Reports() {
  const { state, getBook, getStudent } = useLibrary();

  const monthKey = today().slice(0, 7);
  const [year, monthNo] = monthKey.split('-').map(Number);
  const monthName = `${MONTH_NAMES[monthNo - 1]} ${year}`;
  const inMonth = (date) => Boolean(date) && date.startsWith(monthKey);

  // Every loan ever made: the ones still out plus the ones that came back.
  const issues = [...state.loans, ...state.history];
  const thisMonth = issues.filter((loan) => inMonth(loan.issuedOn));

  const topTitles = tally(thisMonth.map((loan) => loan.bookId))
    .slice(0, 5)
    .map(([bookId, count]) => ({ book: getBook(bookId), count }));
  const topMembers = tally(thisMonth.map((loan) => loan.studentId))
    .slice(0, 5)
    .map(([studentId, count]) => ({ member: getStudent(studentId), count }));
  const pastDue = state.loans
    .filter((loan) => loanStatus(loan).overdue)
    .sort((a, b) => a.dueOn.localeCompare(b.dueOn));

  const perMonth = Array.from({ length: monthNo }, (_, i) => {
    const key = `${year}-${String(i + 1).padStart(2, '0')}`;
    return { label: MONTH_NAMES[i].slice(0, 3), key, count: issues.filter((l) => l.issuedOn.startsWith(key)).length };
  });
  const tallest = Math.max(1, ...perMonth.map((m) => m.count));

  const byCategory = tally(thisMonth.map((loan) => getBook(loan.bookId).category));

  const figures = [
    ['Books issued', thisMonth.length],
    ['Books returned', state.history.filter((h) => inMonth(h.returnedOn)).length],
    [
      'Fines collected',
      rupees(state.fines.filter((f) => f.status === 'paid' && inMonth(f.paidOn)).reduce((s, f) => s + f.amount, 0)),
    ],
    ['New members', state.students.filter((s) => inMonth(s.joinedOn)).length],
  ];

  const exportTitles = () =>
    downloadCsv(
      `top-titles-${monthKey}.csv`,
      [
        { label: 'Title', value: (r) => r.book.title },
        { label: 'Author', value: (r) => r.book.author },
        { label: 'Issues', value: (r) => r.count },
      ],
      topTitles,
    );
  const exportMembers = () =>
    downloadCsv(
      `most-active-${monthKey}.csv`,
      [
        { label: 'Member ID', value: (r) => r.member.id },
        { label: 'Member', value: (r) => r.member.name },
        { label: 'Books issued', value: (r) => r.count },
      ],
      topMembers,
    );
  const exportMonths = () =>
    downloadCsv(
      `loans-per-month-${year}.csv`,
      [
        { label: 'Month', value: (r) => r.key },
        { label: 'Books issued', value: (r) => r.count },
      ],
      perMonth,
    );
  const exportPastDue = () =>
    downloadCsv(
      'past-due.csv',
      [
        { label: 'Member ID', value: (l) => l.studentId },
        { label: 'Member', value: (l) => getStudent(l.studentId).name },
        { label: 'Book', value: (l) => getBook(l.bookId).title },
        { label: 'Due', value: (l) => l.dueOn },
        { label: 'Status', value: (l) => loanStatus(l).label },
      ],
      pastDue,
    );

  const csvButton = (onClick, label) => (
    <button type="button" className="ad-link" onClick={onClick} aria-label={`Export ${label} as CSV`}>
      Export CSV
    </button>
  );

  return (
    <>
      <title>Reports | BookVerse Admin</title>
      <meta name="description" content="Monthly lending reports for BookVerse." />
      <main className="ad-main">
        <PageHeader title="Reports" meta={<>For {monthName}, up to today</>} />

        <section className="figures" aria-label={`${monthName} totals`}>
          {figures.map(([label, value]) => (
            <div className="figure" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>Books issued per month</h2>
            {csvButton(exportMonths, 'loans per month')}
          </div>
          <div className="bars" role="img" aria-label={`Books issued per month in ${year}`}>
            {perMonth.map((m, i) => (
              <div className={`bars-col${i === perMonth.length - 1 ? ' now' : ''}`} key={m.key}>
                <span className="val">{m.count}</span>
                <div className="bar" style={{ height: `${(m.count / tallest) * 100}%` }} />
                <span className="lbl">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="ad-cols ad-section">
          <section>
            <div className="ad-section-head">
              <h2>Most borrowed titles</h2>
              {csvButton(exportTitles, 'top titles')}
            </div>
            <LedgerTable
              columns={[
                { key: 'rank', label: '#', mono: true, render: (r) => topTitles.indexOf(r) + 1 },
                {
                  key: 'title',
                  label: 'Title',
                  title: true,
                  render: (r) => (
                    <>
                      <strong>{r.book.title}</strong>
                      <small>{r.book.author}</small>
                    </>
                  ),
                },
                { key: 'count', label: 'Issues', num: true },
              ]}
              rows={topTitles}
              rowKey={(r) => r.book.id}
              empty={<strong>No books were issued this month.</strong>}
            />
          </section>

          <section>
            <div className="ad-section-head">
              <h2>Most active members</h2>
              {csvButton(exportMembers, 'most active members')}
            </div>
            <LedgerTable
              columns={[
                {
                  key: 'member',
                  label: 'Member',
                  title: true,
                  render: (r) => (
                    <Link to={`/admin/members/${r.member.id}`} className="ad-link">
                      {r.member.name}
                    </Link>
                  ),
                },
                { key: 'count', label: 'Issued', num: true },
              ]}
              rows={topMembers}
              rowKey={(r) => r.member.id}
              empty={<strong>No activity this month.</strong>}
            />
          </section>
        </div>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>Share of issues by category</h2>
            <span className="muted">{plural(thisMonth.length, 'issue')} in {monthName}</span>
          </div>
          <div className="hbars">
            {byCategory.length === 0 && <p className="muted">No books were issued this month.</p>}
            {byCategory.map(([category, count]) => (
              <div className="hbar" key={category}>
                <span>{category}</span>
                <div className="track">
                  <div className="fill" style={{ width: `${(count / byCategory[0][1]) * 100}%` }} />
                </div>
                <span className="num">
                  {Math.round((count / thisMonth.length) * 100)}% · {count}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="ad-section">
          <div className="ad-section-head">
            <h2>Past due today</h2>
            {csvButton(exportPastDue, 'past due loans')}
          </div>
          <LedgerTable
            columns={[
              {
                key: 'member',
                label: 'Member',
                title: true,
                render: (l) => (
                  <Link to={`/admin/members/${l.studentId}`} className="ad-link">
                    {getStudent(l.studentId).name}
                  </Link>
                ),
              },
              { key: 'book', label: 'Book', render: (l) => getBook(l.bookId).title },
              { key: 'due', label: 'Was due', mono: true, render: (l) => l.dueOn },
              { key: 'late', label: 'Overdue', render: (l) => loanStatus(l).label },
            ]}
            rows={pastDue}
            rowKey={(l) => l.id}
            empty={<strong>Nothing is overdue.</strong>}
          />
        </section>
      </main>
    </>
  );
}
