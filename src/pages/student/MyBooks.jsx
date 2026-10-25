import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import {
  canRenew,
  formatDate,
  loanStatus,
  monthDay,
  pad,
  plural,
  useStudent,
} from '../../context/LibraryContext';
import css from '../../styles/my-books.css?inline';

const COVERS = ['cover-one', 'cover-two', 'cover-three'];
const ICONS = ['', ' icon-two', ' icon-three'];
const HISTORY_PREVIEW = 3;
const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five'];

function HistoryRow({ entry, book, index }) {
  return (
    <article className="history-row">
      <div className={`history-book-icon${ICONS[index % ICONS.length]}`}>
        <i className="fa-solid fa-book" />
      </div>
      <div className="history-book">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
      <div className="history-date">
        <span>Borrowed</span> <strong>{formatDate(entry.issuedOn)}</strong>
      </div>
      <div className="history-date">
        <span>Returned</span> <strong>{formatDate(entry.returnedOn)}</strong>
      </div>
      <span className="returned-status">Returned</span>
    </article>
  );
}

export default function MyBooks() {
  const { loans, history, getBook, renewLoan, settings } = useStudent();
  const [tab, setTab] = useState('current');

  const borrowed = loans.map((loan) => ({ loan, book: getBook(loan.bookId), status: loanStatus(loan) }));
  const byDueDate = [...borrowed].sort((a, b) => a.status.days - b.status.days);
  const dueSoon = borrowed.filter(({ status }) => !status.overdue && status.days <= 7);
  const shownHistory = tab === 'history' ? history : history.slice(0, HISTORY_PREVIEW);

  const tabs = [
    { id: 'current', label: 'Currently borrowed', count: borrowed.length },
    { id: 'history', label: 'Previously returned', count: history.length },
    { id: 'due', label: 'Due dates', count: dueSoon.length },
  ];

  const borrowedPanel = (
    <section className="books-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">CURRENTLY BORROWED</p>
          <h2>Books you're reading</h2>
        </div>
        <span className="panel-count">{plural(borrowed.length, 'active loan')}</span>
      </div>
      <div className="borrowed-books">
        {borrowed.map(({ loan, book, status }, index) => {
          const renew = canRenew(loan, settings);
          return (
            <article
              className={`borrowed-card${status.overdue ? ' overdue-book' : ''}`}
              key={loan.id}
            >
              <div className={`book-cover ${COVERS[index % COVERS.length]}`}>
                <span className="cover-number">{pad(index + 1)}</span>{' '}
                <i className="fa-solid fa-book-open" />
              </div>
              <div className="book-main">
                <span className="category">{book.category.toUpperCase()}</span>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <div className="loan-details">
                  <div>
                    <span>Borrowed</span> <strong>{formatDate(loan.issuedOn)}</strong>
                  </div>
                  <div>
                    <span>Due date</span> <strong>{formatDate(loan.dueOn)}</strong>
                  </div>
                </div>
              </div>
              <div className="book-status">
                <span className={`status ${status.overdue ? 'overdue' : 'on-time'}`}>
                  {status.overdue ? 'Overdue' : 'On time'}
                </span>
                <p>{status.label}</p>
              </div>
              <button
                type="button"
                className="book-action as-link"
                disabled={!renew.ok}
                title={renew.reason}
                onClick={() => renewLoan(loan.id)}
              >
                {renew.ok ? 'Renew' : loan.renewals >= settings.maxRenewals ? 'Renewed' : "Can't renew"}{' '}
                <i className={`fa-solid ${renew.ok ? 'fa-rotate-right' : 'fa-lock'}`} />
              </button>
            </article>
          );
        })}
        {borrowed.length === 0 && (
          <p className="empty-state">
            <i className="fa-solid fa-book-open" /> You have no books on loan right now.
            <Link to="/student/browse-books">Browse books</Link>
          </p>
        )}
      </div>
    </section>
  );

  const historyPanel = (
    <section className="books-panel returned-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">PREVIOUSLY RETURNED</p>
          <h2>Your reading history</h2>
        </div>
        {tab === 'history' ? (
          <span className="panel-count">{plural(history.length, 'book')} returned</span>
        ) : (
          <button type="button" className="text-arrow as-link" onClick={() => setTab('history')}>
            Full history <i className="fa-solid fa-arrow-right" />
          </button>
        )}
      </div>
      <div className="history-list">
        {shownHistory.map((entry, index) => (
          <HistoryRow key={entry.id} entry={entry} book={getBook(entry.bookId)} index={index} />
        ))}
      </div>
    </section>
  );

  const duePanel = (
    <section className="due-panel">
      <div className="due-panel-copy">
        <p className="eyebrow">DUE DATES</p>
        <h2>Stay ahead of your returns.</h2>
        <p>
          You have {NUMBER_WORDS[dueSoon.length] ?? dueSoon.length}{' '}
          {dueSoon.length === 1 ? 'book' : 'books'} due this week. Returning them on time helps keep
          your account clear.
        </p>
      </div>
      <div className="due-summary">
        {byDueDate.map(({ loan, book, status }) => {
          const { month, day } = monthDay(loan.dueOn);
          return (
            <div className="due-item" key={loan.id}>
              <div className="date-box">
                <span>{month}</span> <strong>{day}</strong>
              </div>
              <div>
                <h3>{book.title}</h3>
                <p>{status.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      <title>My Books | BookVerse</title>
      <meta name="description" content="My Books - BookVerse student library." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="my-books-hero">
          <div className="container">
            <p className="eyebrow">MY BOOKS</p>
            <div className="hero-heading-row">
              <div>
                <h1>
                  Your reading, <span>all in one place.</span>
                </h1>
                <p className="hero-description">
                  Keep track of what you're borrowing, what you've returned, and when your books are
                  due.
                </p>
              </div>
              <div className="book-count">
                <span>BOOKS WITH YOU</span> <strong>{pad(borrowed.length)}</strong>
              </div>
            </div>
          </div>
        </section>
        {/* BOOKS CONTENT */}
        <section className="my-books-section">
          <div className="container">
            {/* TABS */}
            <div className="book-tabs" role="tablist">
              {tabs.map(({ id, label, count }) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  key={id}
                  className={`tab as-link${tab === id ? ' active-tab' : ''}`}
                  onClick={() => setTab(id)}
                >
                  {label} <span>{pad(count)}</span>
                </button>
              ))}
            </div>
            {tab === 'current' && (
              <>
                {borrowedPanel}
                {historyPanel}
                {duePanel}
              </>
            )}
            {tab === 'history' && historyPanel}
            {tab === 'due' && duePanel}
          </div>
        </section>
      </main>
    </>
  );
}
