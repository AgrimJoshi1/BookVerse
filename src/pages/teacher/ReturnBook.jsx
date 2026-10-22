import PageStyles from '../../components/PageStyles';
import css from '../../styles/teacher-return-book.css?inline';

export default function ReturnBook() {
  return (
    <>
      <title>Return Book | BookVerse</title>
      <meta name="description" content="Process a book return in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">RETURN BOOK</p>
            <h1>
              Process a <span>book return.</span>
            </h1>
            <p className="hero-description">
              Search or scan the book, confirm the borrower, and complete the return in a few
              seconds.
            </p>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              {/* FIND */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 1</p>
                    <h2>Search or scan the book</h2>
                  </div>
                </div>
                <div className="search-box">
                  <i className="fa-solid fa-barcode" />{' '}
                  <input
                    type="text"
                    placeholder="Search by title, ISBN, or scan barcode"
                    defaultValue="Introduction to Algorithms"
                  />{' '}
                  <button type="button">Search</button>
                </div>
                <div className="select-list">
                  <div className="select-row selected">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div className="select-info">
                      <h3>Introduction to Algorithms</h3>
                      <p>Thomas H. Cormen · Borrowed by Aditya Rao</p>
                    </div>
                    <button className="select-pick" type="button">
                      Selected
                    </button>
                  </div>
                </div>
              </section>
              {/* BORROW DETAILS */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 2</p>
                    <h2>Loan details</h2>
                  </div>
                  <span className="badge badge-bad">Overdue</span>
                </div>
                <div className="data-table">
                  <div className="table-head" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <span>Borrowed</span> <span>Due date</span> <span>Days overdue</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: '1fr 1fr 1fr', minHeight: '56px' }}
                  >
                    <strong>09 Aug 2026</strong> <strong>23 Aug 2026</strong>{' '}
                    <strong style={{ color: '#d29b78' }}>3 days</strong>
                  </div>
                </div>
                <div className="notice notice-warning">
                  <i className="fa-solid fa-triangle-exclamation" />
                  <p>
                    This book is overdue by 3 days. A fine will be applied automatically based on
                    library policy (₹10 / day).
                  </p>
                </div>
              </section>
              {/* RETURN DATE */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 3</p>
                    <h2>Confirm return date</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="return-date">Return date</label>{' '}
                    <input type="date" id="return-date" defaultValue="2026-08-26" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fine-amount">Fine due</label>{' '}
                    <input type="text" id="fine-amount" defaultValue="₹30" readOnly />{' '}
                    <span className="field-hint">Calculated automatically from days overdue.</span>
                  </div>
                </div>
              </section>
            </div>
            {/* SUMMARY SIDEBAR */}
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <p className="eyebrow">CONFIRM RETURN</p>
                <h2>Summary</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Book</span> <strong>Introduction to Algorithms</strong>
                </div>
                <div className="summary-line">
                  <span>Student</span> <strong>Aditya Rao</strong>
                </div>
                <div className="summary-line">
                  <span>Due date</span> <strong>23 Aug 2026</strong>
                </div>
                <div className="summary-line">
                  <span>Return date</span> <strong>26 Aug 2026</strong>
                </div>
                <div className="summary-line">
                  <span>Fine due</span> <strong>₹30</strong>
                </div>
                <button
                  className="light-button"
                  type="button"
                  style={{ width: '100%', marginTop: '18px' }}
                >
                  Complete return <i className="fa-solid fa-check" />
                </button>
                <div className="notice notice-info">
                  <i className="fa-solid fa-circle-info" />
                  <p>
                    Completing the return will mark the book available and add the fine to the
                    student's account.
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
