import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import Pagination from '../../components/Pagination';
import { initials, memberLine, plural, studentSummary, useLibrarian } from '../../context/LibraryContext';
import css from '../../styles/librarian-students.css?inline';

const PAGE_SIZE = 8;

const FILTERS = [
  { id: 'all', label: 'All students', test: () => true },
  { id: 'overdue', label: 'With overdue books', test: (s) => s.overdue > 0 },
  { id: 'borrowing', label: 'Currently borrowing', test: (s) => s.active > 0 },
  { id: 'none', label: 'No active loans', test: (s) => s.active === 0 },
];

export default function Students() {
  const { state, students } = useLibrarian();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  const needle = query.trim().toLowerCase();
  const matching = students
    .filter(
      (student) =>
        !needle ||
        student.name.toLowerCase().includes(needle) ||
        student.id.toLowerCase().includes(needle),
    )
    .map((student) => ({ student, summary: studentSummary(state, student.id) }));

  const countFor = (f) => matching.filter(({ summary }) => f.test(summary)).length;
  const active = FILTERS.find((f) => f.id === filter);
  const rows = matching.filter(({ summary }) => active.test(summary));

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function change(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <>
      <title>Students | BookVerse</title>
      <meta name="description" content="Manage and view student borrowing activity in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">STUDENTS</p>
            <h1>
              Every member, <span>at a glance.</span>
            </h1>
            <p className="hero-description">
              Search and review every student's borrowing activity, overdue status, and contact
              details.
            </p>
            <form className="search-box hero-search" onSubmit={(event) => event.preventDefault()}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input
                type="text"
                placeholder="Search by name or student ID"
                value={query}
                onChange={(event) => change(setQuery)(event.target.value)}
              />{' '}
              {query ? (
                <button type="button" onClick={() => change(setQuery)('')}>
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
                  className={`filter-button${filter === f.id ? ' active-filter' : ''}`}
                  onClick={() => change(setFilter)(f.id)}
                >
                  {f.label} · {countFor(f)}
                </button>
              ))}
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">STUDENT LIST</p>
                  <h2>{active.label}</h2>
                </div>
                <span className="panel-count">{plural(rows.length, 'student')}</span>
              </div>
              <div className="data-table">
                <div className="table-head cols-students">
                  <span>Student</span> <span>Student ID</span> <span>Department</span>{' '}
                  <span>Contact</span> <span>Borrowed</span> <span>Status</span> <span />
                </div>
                {visible.map(({ student, summary }) => (
                  <div className="table-row cols-students" key={student.id}>
                    <div className="table-entity">
                      <div className="mini-person">{initials(student.name)}</div>
                      <div>
                        <strong>{student.name}</strong> <small>{student.id}</small>
                      </div>
                    </div>
                    <span>{student.id}</span> <span>{memberLine(student)}</span>{' '}
                    <span>{student.email}</span> <span>{summary.active}</span>{' '}
                    <span className={`badge badge-${summary.status.tone}`}>
                      {summary.status.label}
                    </span>{' '}
                    <Link to={`/librarian/students/${student.id}`} className="row-action">
                      View <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                ))}
                {visible.length === 0 && (
                  <p className="empty-state table-empty-row">
                    <i className="fa-solid fa-magnifying-glass" /> No students match these filters.
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
