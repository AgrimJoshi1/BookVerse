import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import LedgerTable from '../../components/admin/LedgerTable';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import Pager from '../../components/admin/Pager';
import StatusDot from '../../components/admin/StatusDot';
import WaiveDialog from '../../components/admin/WaiveDialog';
import usePaging from '../../components/admin/usePaging';
import { accruingTotal, formatDate, plural, rupees, useLibrary } from '../../context/LibraryContext';
import { downloadCsv } from '../../utils/csv';

const PAGE_SIZE = 10;
const FILTERS = [
  ['all', 'All'],
  ['due', 'Unpaid'],
  ['paid', 'Paid'],
  ['waived', 'Waived'],
];
const STATUS = {
  due: { tone: 'bad', label: 'Unpaid' },
  paid: { tone: 'good', label: 'Paid' },
  waived: { tone: 'neutral', label: 'Waived' },
};

export default function Fines() {
  const { state, getBook, getStudent, markFinePaid } = useLibrary();
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState(null); // { kind: 'paid' | 'waive', fine }
  const [notice, setNotice] = useState('');

  const fines = state.fines;
  const filter = FILTERS.some(([value]) => value === params.get('status')) ? params.get('status') : 'all';
  const count = (value) => (value === 'all' ? fines.length : fines.filter((f) => f.status === value).length);
  const sum = (value) => fines.filter((f) => f.status === value).reduce((total, f) => total + f.amount, 0);

  const needle = query.trim().toLowerCase();
  const filtered = fines.filter(
    (f) =>
      (filter === 'all' || f.status === filter) &&
      (!needle ||
        [getStudent(f.studentId).name, f.studentId, getBook(f.bookId).title].some((t) =>
          t.toLowerCase().includes(needle),
        )),
  );
  const paging = usePaging(filtered, PAGE_SIZE, `${needle}|${filter}`);

  const columns = [
    {
      key: 'member',
      label: 'Member',
      title: true,
      render: (f) => (
        <>
          <Link to={`/admin/members/${f.studentId}`} className="ad-link">
            {getStudent(f.studentId).name}
          </Link>
          <small className="mono">{f.studentId}</small>
        </>
      ),
    },
    { key: 'book', label: 'Book', render: (f) => getBook(f.bookId).title },
    {
      key: 'reason',
      label: 'Reason',
      render: (f) => (
        <>
          {f.reason}
          <small>{plural(f.days, 'day')} late</small>
        </>
      ),
    },
    { key: 'amount', label: 'Amount', num: true, render: (f) => rupees(f.amount) },
    {
      key: 'status',
      label: 'Status',
      render: (f) => (
        <>
          <StatusDot tone={STATUS[f.status].tone}>{STATUS[f.status].label}</StatusDot>
          {f.status === 'waived' && <small>{f.waivedReason}</small>}
          {f.status === 'paid' && <small>{formatDate(f.paidOn)}</small>}
        </>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (f) =>
        f.status === 'due' && (
          <>
            <button
              type="button"
              className="btn btn-sm"
              aria-label={`Mark ${getStudent(f.studentId).name}'s fine paid`}
              onClick={() => setDialog({ kind: 'paid', fine: f })}
            >
              Mark paid
            </button>
            <button
              type="button"
              className="btn btn-sm"
              aria-label={`Waive ${getStudent(f.studentId).name}'s fine`}
              onClick={() => setDialog({ kind: 'waive', fine: f })}
            >
              Waive
            </button>
          </>
        ),
    },
  ];

  function exportCsv() {
    downloadCsv(
      `fines-${filter}.csv`,
      [
        { label: 'Member ID', value: (f) => f.studentId },
        { label: 'Member', value: (f) => getStudent(f.studentId).name },
        { label: 'Book', value: (f) => getBook(f.bookId).title },
        { label: 'Days late', value: (f) => f.days },
        { label: 'Amount', value: (f) => f.amount },
        { label: 'Status', value: (f) => STATUS[f.status].label },
        { label: 'Waived reason', value: (f) => f.waivedReason ?? '' },
      ],
      filtered,
    );
  }

  const figures = [
    ['Fines issued', rupees(sum('due') + sum('paid') + sum('waived'))],
    ['Collected', rupees(sum('paid'))],
    ['Outstanding', rupees(sum('due')), sum('due') > 0],
    ['Waived', rupees(sum('waived'))],
  ];

  return (
    <>
      <title>Fines | BookVerse Admin</title>
      <meta name="description" content="Track, collect and waive library fines." />
      <main className="ad-main">
        <PageHeader
          title="Fines"
          meta={
            <>
              <span className="mono">{count('due')}</span> unpaid · <span className="mono">{count('all')}</span> on record ·{' '}
              <span className="mono">{rupees(accruingTotal(state))}</span> still accruing on overdue loans
            </>
          }
        >
          <button type="button" className="btn" onClick={exportCsv}>
            Export CSV
          </button>
        </PageHeader>

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <section className="figures" aria-label="Fine totals">
          {figures.map(([label, value, bad]) => (
            <div className={`figure${bad ? ' bad' : ''}`} key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <div className="ad-toolbar ad-section">
          <input
            type="search"
            className="ad-input"
            placeholder="Search member, ID or book"
            aria-label="Search fines"
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
          rowKey={(f) => f.id}
          empty={
            <>
              <strong>No fines here.</strong>
              Nothing matches this filter.
            </>
          }
        />
        <Pager {...paging} onPage={paging.setPage} />
      </main>

      {dialog?.kind === 'paid' && (
        <ConfirmDialog
          title={`Mark ${rupees(dialog.fine.amount)} as paid?`}
          confirmLabel="Mark paid"
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            markFinePaid(dialog.fine.id);
            setNotice(`Recorded ${rupees(dialog.fine.amount)} paid by ${getStudent(dialog.fine.studentId).name}.`);
            setDialog(null);
          }}
        >
          <p>This records that {getStudent(dialog.fine.studentId).name} has paid the fine in full.</p>
        </ConfirmDialog>
      )}

      {dialog?.kind === 'waive' && (
        <WaiveDialog
          fine={dialog.fine}
          onClose={(waived) => {
            if (waived) {
              setNotice(`Waived ${rupees(dialog.fine.amount)} for ${getStudent(dialog.fine.studentId).name}.`);
            }
            setDialog(null);
          }}
        />
      )}
    </>
  );
}
