import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../../components/admin/Field';
import PageHeader from '../../components/admin/PageHeader';
import { today } from '../../api/engine';
import { ApiError, copiesOut, plural, useLibrary } from '../../context/LibraryContext';

const BLANK = {
  title: '',
  author: '',
  category: '',
  isbn: '',
  copies: '1',
  shelf: '',
  addedOn: today(),
  description: '',
};

// One form for both "Add book" and "Edit book".
export default function AddBook() {
  const { id } = useParams();
  const { state, categories, getBook, addBook, updateBook } = useLibrary();
  const navigate = useNavigate();

  const existing = id ? getBook(id) : null;
  const [fields, setFields] = useState(() =>
    existing ? { ...BLANK, ...existing, copies: String(existing.copies) } : BLANK,
  );
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  if (id && (!existing || existing.archived)) {
    return (
      <main className="ad-main">
        <title>Book not found | BookVerse Admin</title>
        <div className="ad-empty">
          <h2>Book not found</h2>
          <p>There is no book in the catalog with the id “{id}”.</p>
          <Link to="/admin/books" className="btn">
            Back to books
          </Link>
        </div>
      </main>
    );
  }

  const set = (key) => (event) => setFields({ ...fields, [key]: event.target.value });
  const props = (key, label) => ({
    id: `book-${key}`,
    label,
    value: fields[key],
    onChange: set(key),
    error: errors[key],
  });
  const out = existing ? copiesOut(state, existing.id) : null;

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await (existing ? updateBook(existing.id, fields) : addBook(fields));
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setErrors(error.fields);
      setBusy(false);
      return;
    }
    const title = fields.title.trim();
    navigate('/admin/books', {
      state: { notice: existing ? `Saved changes to “${title}”.` : `Added “${title}” to the catalog.` },
    });
  }

  return (
    <>
      <title>{existing ? 'Edit book' : 'Add book'} | BookVerse Admin</title>
      <meta name="description" content="Add or edit a book in the BookVerse catalog." />
      <main className="ad-main">
        <PageHeader
          title={existing ? 'Edit book' : 'Add book'}
          meta={
            existing ? (
              <span className="mono">{existing.id}</span>
            ) : (
              'New titles are available to members straight away.'
            )
          }
        >
          <Link to="/admin/books" className="btn">
            Cancel
          </Link>
        </PageHeader>

        <form className="ad-form" onSubmit={submit} noValidate>
          <div className="form-grid">
            <Field {...props('title', 'Title')} className="wide" />
            <Field {...props('author', 'Author')} />
            <Field as="select" {...props('category', 'Category')}>
              <option value="">Choose a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id}
                </option>
              ))}
            </Field>
            <Field {...props('isbn', 'ISBN')} placeholder="978-0000000000" />
            <Field {...props('shelf', 'Shelf')} placeholder="A-12" />
            <Field
              {...props('copies', 'Copies owned')}
              type="number"
              min="1"
              hint={out ? `${plural(out.total, 'copy', 'copies')} out or on hold right now.` : undefined}
            />
            <Field {...props('addedOn', 'Date added')} type="date" max={today()} />
            <Field as="textarea" {...props('description', 'Description')} className="wide" hint="Optional." />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving…' : existing ? 'Save changes' : 'Add book'}
            </button>
            <Link to="/admin/books" className="btn">
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
