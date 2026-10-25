import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LedgerTable from '../../components/admin/LedgerTable';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import Pager from '../../components/admin/Pager';
import ReturnDialog from '../../components/admin/ReturnDialog';
import StatusDot from '../../components/admin/StatusDot';
import usePaging from '../../components/admin/usePaging';
import { buildTransactions, formatDate, rupees, useLibrary } from '../../context/LibraryContext';
import { downloadCsv } from '../../utils/csv';

const PAGE_SIZE = 12;
const FILTERS = [
  ['all', 'All'],
  ['issued', 'Issued'],
  ['overdue', 'Overdue'],
  ['returned', 'Returned'],
];
const STATUS = {
  issued: { tone: 'good', label: 'Issued' },
  overdue: { tone: 'bad', label: 'Overdue' },
  returned: { tone: 'neutral', label: 'Returned' },
};

export default function Transactions() {
  const { state, getBook, getStudent, sendReminder } = useLibrary();
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [returning, setReturning] = useState(null);
  const [notice, setNotice] = useState('');

  const rows = buildTransactions(state);
  const filter = FILTERS.some(([value]) => value === params.get('status')) ? params.get('status') : 'all';
  const count = (value) => (value === 'all' ? rows.length : rows.filter((r) => r.status === value).length);

  const needle = query.trim().toLowerCase();
  const filtered = rows.filter(
    (r) =>
      (filter === 'all' || r.status === filter) &&
      (!needle ||
        [getStudent(r.studentId).name, r.studentId, getBook(r.bookId).title].some((t) =>
          t.toLowerCase().includes(needle),
        )),
  );
  const paging = usePaging(filtered, PAGE_SIZE, `${needle}|${filter}`);

  const columns = [
    {
      key: 'member',
      label: 'Member',
      title: true,
      render: (r) => (
        <>
          <strong>{getStudent(r.studentId).name}</strong>
          <small className="mono">{r.studentId}</small>
        </>
      ),
    },
    { key: 'book', label: 'Book', render: (r) => getBook(r.bookId).title },
    { key: 'issued', label: 'Issued', render: (r) => formatDate(r.issuedOn) },
    { key: 'due', label: 'Due', render: (r) => formatDate(r.dueOn) },
    { key: 'returned', label: 'Returned', render: (r) => (r.returnedOn ? formatDate(r.returnedOn) : '—') },
    { key: 'fine', label: 'Fine', num: true, render: (r) => (r.fine ? rupees(r.fine) : '—') },
    {
      key: 'status',
      label: 'Status',
      render: (r) => <StatusDot tone={STATUS[r.status].tone}>{STATUS[r.status].label}</StatusDot>,
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (r) =>
        r.loanId && (
          <>
            {r.status === 'overdue' && (
              <button
                type="button"
                className="btn btn-sm"
                disabled={Boolean(r.remindedOn)}
                onClick={() => sendReminder(r.loanId)}
              >
                {r.remindedOn ? 'Reminded' : 'Remind'}
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm"
              aria-label={`Return ${getBook(r.bookId).title} from ${getStudent(r.studentId).name}`}
              onClick={() => setReturning(state.loans.find((l) => l.id === r.loanId))}
            >
              Return
            </button>
          </>
        ),
    },
  ];

  function exportCsv() {
    downloadCsv(
      `transactions-${filter}.csv`,
      [
        { label: 'Member ID', value: (r) => r.studentId },
        { label: 'Member', value: (r) => getStudent(r.studentId).name },
        { label: 'Book', value: (r) => getBook(r.bookId).title },
        { label: 'Issued', value: (r) => r.issuedOn },
        { label: 'Due', value: (r) => r.dueOn },
        { label: 'Returned', value: (r) => r.returnedOn ?? '' },
        { label: 'Fine', value: (r) => r.fine },
        { label: 'Status', value: (r) => STATUS[r.status].label },
      ],
      filtered,
    );
  }

  return (
    <>
      <title>Transactions | BookVerse Admin</title>
      <meta name="description" content="Every issue and return across the library." />
      <main className="ad-main">
        <PageHeader
          title="Transactions"
          meta={
            <>
              <span className="mono">{count('issued') + count('overdue')}</span> on loan ·{' '}
              <span className="mono">{count('returned')}</span> returned
            </>
          }
        >
          <button type="button" className="btn" onClick={exportCsv}>
            Export CSV
          </button>
        </PageHeader>

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <div className="ad-toolbar">
          <input
            type="search"
            className="ad-input"
            placeholder="Search member, ID or book"
            aria-label="Search transactions"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="ad-tabs">
            {FILTERS.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={`ad-tab${filter === value ? ' on' : ''}`}
                onClick={() => setParams(value === 'all' ? {} : { status: value })}
              >
                {label}
                <span className="mono">{count(value)}</span>
              </button>
            ))}
          </div>
        </div>

        <LedgerTable
          columns={columns}
          rows={paging.rows}
          rowKey={(r) => r.key}
          empty={
            <>
              <strong>No transactions match.</strong>
              Try a different search or filter.
            </>
          }
        />
        <Pager {...paging} onPage={paging.setPage} />
      </main>

      {returning && (
        <ReturnDialog
          loan={returning}
          onClose={(done) => {
            setReturning(null);
            if (done) {
              setNotice(
                `Returned “${done.book}” from ${done.member}${done.fine ? ` with a fine of ${rupees(done.fine)}` : ''}.`,
              );
            }
          }}
        />
      )}
    </>
  );
}
