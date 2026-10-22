import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-add-book.css?inline';

export default function AddBook() {
  return (
    <>
      <title>Add / Edit Book | BookVerse Admin</title>
      <meta name="description" content="Add or edit a book in the BookVerse catalog." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">BOOKS / EDIT</p>
            <h1>
              Edit <span>Clean Code.</span>
            </h1>
            <p className="hero-description">
              This form is shared for both adding a new title and editing an existing one — right
              now it's pre-filled because you arrived from a row's Edit action. To add a fresh title
              instead, open this page from the{' '}
              <strong style={{ color: '#cfc1b6' }}>Add book</strong> button on the Books page, which
              loads the same layout empty.
            </p>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">BOOK DETAILS</p>
                    <h2>Title information</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group full">
                    <label htmlFor="book-title">Title</label>{' '}
                    <input type="text" id="book-title" defaultValue="Clean Code" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-author">Author</label>{' '}
                    <input type="text" id="book-author" defaultValue="Robert C. Martin" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-category">Category</label>{' '}
                    <select id="book-category">
                      <option>Programming</option>
                      <option>AI &amp; ML</option>
                      <option>Databases</option>
                      <option>Mathematics</option>
                      <option>Fiction</option>
                      <option>Self Development</option>
                      <option>Computer Science</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-isbn">ISBN</label>{' '}
                    <input type="text" id="book-isbn" defaultValue="978-0132350884" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-copies">Total copies</label>{' '}
                    <input type="number" id="book-copies" defaultValue="4" min="0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-shelf">Shelf location</label>{' '}
                    <input type="text" id="book-shelf" defaultValue="A-12" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-added">Date added</label>{' '}
                    <input type="date" id="book-added" defaultValue="2024-03-11" />
                  </div>
                  <div className="form-group full">
                    <label htmlFor="book-description">Description</label>{' '}
                    <textarea
                      id="book-description"
                      defaultValue="A handbook of agile software craftsmanship that teaches how to write code that is readable, maintainable, and built to last — covering naming, functions, formatting, and refactoring practices."
                    />
                  </div>
                </div>
                <div className="notice notice-success">
                  <i className="fa-regular fa-circle-check" />
                  <p>
                    All required fields are filled in. Review the details, then save your changes.
                  </p>
                </div>
                <div className="form-actions">
                  <Link to="/admin/books" className="outline-button">
                    Cancel
                  </Link>{' '}
                  <button className="light-button" type="button">
                    Save changes <i className="fa-solid fa-check" />
                  </button>
                </div>
              </section>
            </div>
            {/* SIDEBAR */}
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <p className="eyebrow">PREVIEW</p>
                <h2 style={{ fontSize: '1.05rem' }}>Catalog entry</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Title</span> <strong>Clean Code</strong>
                </div>
                <div className="summary-line">
                  <span>Author</span> <strong>Robert C. Martin</strong>
                </div>
                <div className="summary-line">
                  <span>Category</span> <strong>Programming</strong>
                </div>
                <div className="summary-line">
                  <span>ISBN</span> <strong>978-0132350884</strong>
                </div>
                <div className="summary-line">
                  <span>Copies</span> <strong>4 total</strong>
                </div>
                <div className="summary-line">
                  <span>Shelf</span> <strong>A-12</strong>
                </div>
                <div className="summary-line">
                  <span>Status</span> <span className="badge badge-good">Available</span>
                </div>
              </section>
              <section className="side-card">
                <p className="eyebrow">NEEDS ATTENTION</p>
                <h2 style={{ fontSize: '1.05rem' }}>Before you save</h2>
                <div className="notice notice-warning" style={{ marginTop: '0' }}>
                  <i className="fa-solid fa-triangle-exclamation" />
                  <p>
                    Lowering total copies below the number currently borrowed will mark the title as
                    unavailable until returns catch up.
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
