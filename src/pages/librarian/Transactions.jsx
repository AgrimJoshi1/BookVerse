import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import Pagination from '../../components/Pagination';
import {
  buildTransactions,
  formatDate,
  initials,
  plural,
  rupees,
  useLibrarian,
} from '../../context/LibraryContext';
import css from '../../styles/librarian-transactions.css?inline';

const PAGE_SIZE = 8;

const FILTERS = [
  { id: 'all', label: 'All transactions', test: () => true },
  { id: 'issued', label: 'Issued', test: (row) => row.status === 'issued' },
  { id: 'returned', label: 'Returned', test: (row) => row.status === 'returned' },
  { id: 'overdue', label: 'Overdue', test: (row) => row.status === 'overdue' },
];

const BADGES = {
  issued: { label: 'On time', tone: 'good' },
  overdue: { label: 'Overdue', tone: 'bad' },
  returned: { label: 'Completed', tone: 'good' },
};

export default function Transactions() {
  const { state, getBook, getStudent, sendReminder } = useLibrarian();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filterId = FILTERS.some((f) => f.id === params.get('status')) ? params.get('status') : 'all';
  const active = FILTERS.find((f) => f.id === filterId);

  const needle = query.trim().toLowerCase();
  const matching = buildTransactions(state).filter(
    (row) =>
      !needle ||
      getStudent(row.studentId).name.toLowerCase().includes(needle) ||
      getBook(row.bookId).title.toLowerCase().includes(needle),
  );
  const rows = matching.filter(active.test);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function pickFilter(id) {
    setParams(id === 'all' ? {} : { status: id }, { replace: true });
    setPage(1);
  }

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }

  return (
    <>
      <title>Transactions | BookVerse</title>
      <meta
        name="description"
        content="Complete borrowing and return transaction history in BookVerse."
      />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">TRANSACTIONS</p>
            <h1>
              Full borrowing <span>&amp; return history.</span>
            </h1>
            <p className="hero-description">
              Every issue and return across the library, with fines and current status at a glance.
            </p>
            <form className="search-box hero-search" onSubmit={(event) => event.preventDefault()}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input
                type="text"
                placeholder="Search by student or book"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />{' '}
              {query ? (
                <button type="button" onClick={() => updateQuery('')}>
                  Clear
                </button>
              ) : (
                <button type="submit">Search</button>
              )}
            </form>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div className="filter-row">
              <span>Filter</span>
              {FILTERS.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  className={`filter-button${filterId === f.id ? ' active-filter' : ''}`}
                  onClick={() => pickFilter(f.id)}
                >
                  {f.label} · {matching.filter(f.test).length}
                </button>
              ))}
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">HISTORY</p>
                  <h2>{active.label}</h2>
                </div>
                <span className="panel-count">{plural(rows.length, 'record')}</span>
              </div>
              <div className="data-table">
                <div className="table-head cols-transactions">
                  <span>Student</span> <span>Book</span> <span>Type</span> <span>Issue date</span>{' '}
                  <span>Due date</span> <span>Return date</span> <span>Fine</span>{' '}
                  <span>Status</span> <span />
                </div>
                {visible.map((row) => {
                  const student = getStudent(row.studentId);
                  const badge = BADGES[row.status];
                  return (
                    <div className="table-row cols-transactions" key={row.key}>
                      <div className="table-entity">
                        <div className="mini-person">{initials(student.name)}</div>
                        <div>
                          <strong>{student.name}</strong>
                        </div>
                      </div>
                      <span>{getBook(row.bookId).title}</span>{' '}
                      <span>{row.kind === 'issue' ? 'Issue' : 'Return'}</span>{' '}
                      <span>{formatDate(row.issuedOn)}</span> <span>{formatDate(row.dueOn)}</span>{' '}
                      <span>{row.returnedOn ? formatDate(row.returnedOn) : '-'}</span>{' '}
                      <span>{rupees(row.fine)}</span>{' '}
                      <span className={`badge badge-${badge.tone}`}>{badge.label}</span>{' '}
                      <div className="row-actions">
                        {row.kind === 'issue' ? (
                          <>
                            <Link
                              to={`/librarian/return-book?loan=${row.loanId}`}
                              className="row-action"
                            >
                              Return <i className="fa-solid fa-arrow-right" />
                            </Link>
                            {row.status === 'overdue' && (
                              <button
                                type="button"
                                className={`row-action as-link${row.remindedOn ? ' is-done' : ''}`}
                                disabled={Boolean(row.remindedOn)}
                                onClick={() => sendReminder(row.loanId)}
                              >
                                {row.remindedOn ? 'Reminded' : 'Remind'}{' '}
                                <i
                                  className={`fa-solid ${row.remindedOn ? 'fa-check' : 'fa-bell'}`}
                                />
                              </button>
                            )}
                          </>
                        ) : (
                          <Link to={`/librarian/students/${student.id}`} className="row-action">
                            Student <i className="fa-solid fa-arrow-right" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
                {visible.length === 0 && (
                  <p className="empty-state table-empty-row">
                    <i className="fa-solid fa-magnifying-glass" /> No transactions match these
                    filters.
                  </p>
                )}
              </div>
              <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
