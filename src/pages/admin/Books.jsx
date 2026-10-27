import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import LedgerTable from '../../components/admin/LedgerTable';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import Pager from '../../components/admin/Pager';
import StatusDot from '../../components/admin/StatusDot';
import usePaging from '../../components/admin/usePaging';
import { archiveBlocker, copiesOut, useLibrary } from '../../context/LibraryContext';

const PAGE_SIZE = 10;
const AVAILABILITY = [
  ['all', 'All'],
  ['in', 'In stock'],
  ['out', 'All out'],
];

export default function Books() {
  const { state, books, categories, archiveBook, addStarterBooks } = useLibrary();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [removing, setRemoving] = useState(null);
  const [notice, setNotice] = useState(location.state?.notice ?? '');
  const [seeding, setSeeding] = useState(false);

  async function seed() {
    setSeeding(true);
    const { added, skipped } = await addStarterBooks();
    setSeeding(false);
    setNotice(
      added
        ? `Added ${added} starter book${added === 1 ? '' : 's'}${skipped ? ` (${skipped} already in the catalog)` : ''}.`
        : 'All the starter books are already in the catalog.',
    );
  }

  const needle = query.trim().toLowerCase();
  const filtered = books.filter(
    (book) =>
      (category === 'all' || book.category === category) &&
      (availability === 'all' || (availability === 'in' ? book.available > 0 : book.available === 0)) &&
      (!needle ||
        [book.title, book.author, book.isbn].some((text) => text.toLowerCase().includes(needle))),
  );
  const paging = usePaging(filtered, PAGE_SIZE, `${needle}|${category}|${availability}`);

  const copies = books.reduce((sum, book) => sum + book.copies, 0);

  const columns = [
    {
      key: 'title',
      label: 'Title',
      title: true,
      render: (book) => (
        <>
          <strong>{book.title}</strong>
          <small>{book.author}</small>
        </>
      ),
    },
    { key: 'category', label: 'Category' },
    { key: 'isbn', label: 'ISBN', mono: true },
    { key: 'shelf', label: 'Shelf', mono: true },
    {
      key: 'loan',
      label: 'Out / owned',
      num: true,
      render: (book) => `${copiesOut(state, book.id).total} / ${book.copies}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (book) =>
        book.available > 0 ? (
          <StatusDot tone="good">{book.available} in stock</StatusDot>
        ) : (
          <StatusDot tone="warn">All out</StatusDot>
        ),
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (book) => {
        const blocker = archiveBlocker(state, book.id);
        return (
          <>
            <Link to={`/admin/books/${book.id}/edit`} className="btn btn-sm" aria-label={`Edit ${book.title}`}>
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              disabled={Boolean(blocker)}
              title={blocker ? `Cannot remove: ${blocker}` : undefined}
              aria-label={`Remove ${book.title}`}
              onClick={() => setRemoving(book)}
            >
              Remove
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <title>Books | BookVerse Admin</title>
      <meta name="description" content="Manage the BookVerse catalog." />
      <main className="ad-main">
        <PageHeader
          title="Books"
          meta={
            <>
              <span className="mono">{books.length}</span> titles · <span className="mono">{copies}</span> copies ·{' '}
              <span className="mono">{state.loans.length}</span> on loan
            </>
          }
        >
          <button type="button" className="btn" onClick={seed} disabled={seeding} title="Add 33 real books with covers">
            {seeding ? 'Adding…' : 'Add starter books'}
          </button>
          <Link to="/admin/add-book" className="btn btn-primary">
            Add book
          </Link>
        </PageHeader>

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <div className="ad-toolbar">
          <input
            type="search"
            className="ad-input"
            placeholder="Search title, author or ISBN"
            aria-label="Search books"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="ad-select"
            aria-label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id}
              </option>
            ))}
          </select>
          <div className="ad-tabs">
            {AVAILABILITY.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={`ad-tab${availability === value ? ' on' : ''}`}
                onClick={() => setAvailability(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <LedgerTable
          columns={columns}
          rows={paging.rows}
          rowKey={(book) => book.id}
          empty={
            <>
              <strong>No books match.</strong>
              Try a different search or clear the filters.
            </>
          }
        />
        <Pager {...paging} onPage={paging.setPage} />
      </main>

      {removing && (
        <ConfirmDialog
          title="Remove this book?"
          confirmLabel="Remove book"
          danger
          onCancel={() => setRemoving(null)}
          onConfirm={() => {
            archiveBook(removing.id);
            setNotice(`Removed “${removing.title}” from the catalog.`);
            setRemoving(null);
            navigate('.', { replace: true, state: null });
          }}
        >
          <p>
            “{removing.title}” leaves the catalog and can no longer be borrowed. Past loans keep
            showing its title.
          </p>
        </ConfirmDialog>
      )}
    </>
  );
}
