import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-transactions.css?inline';

export default function Transactions() {
  return (
    <>
      <title>Transactions | BookVerse Admin</title>
      <meta name="description" content="Library-wide transaction history in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">TRANSACTIONS</p>
            <h1>
              Every issue <span>&amp; return, library-wide.</span>
            </h1>
            <p className="hero-description">
              The complete borrowing history across every class, member, and staff account — not
              just one teacher's roster.
            </p>
            <div className="search-box" style={{ maxWidth: '560px', marginTop: '24px' }}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input type="text" placeholder="Search by member, staff, or book" />{' '}
              <button type="button">Search</button>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div className="filter-row">
              <span>Filter</span>{' '}
              <button className="filter-button active-filter">All transactions</button>{' '}
              <button className="filter-button">Issued</button>{' '}
              <button className="filter-button">Returned</button>{' '}
              <button className="filter-button">Overdue</button>
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">HISTORY</p>
                  <h2>All transactions</h2>
                </div>
                <span className="panel-count">8,246 records</span>
              </div>
              <div className="data-table">
                <div
                  className="table-head"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <span>Member / Staff</span> <span>Book</span> <span>Type</span>{' '}
                  <span>Issue date</span> <span>Due date</span> <span>Return date</span>{' '}
                  <span>Fine</span> <span>Status</span> <span />
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">RM</div>
                    <div>
                      <strong>Rohan Mehta</strong>
                    </div>
                  </div>
                  <span>Clean Code</span> <span>Issue</span> <span>14 Aug 2026</span>{' '}
                  <span>28 Aug 2026</span> <span>-</span> <span>₹0</span>{' '}
                  <span className="badge badge-good">On time</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">PN</div>
                    <div>
                      <strong>Priya Nair</strong>
                    </div>
                  </div>
                  <span>Design Patterns</span> <span>Issue</span> <span>20 Aug 2026</span>{' '}
                  <span>03 Sep 2026</span> <span>-</span> <span>₹0</span>{' '}
                  <span className="badge badge-good">On time</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AR</div>
                    <div>
                      <strong>Aditya Rao</strong>
                    </div>
                  </div>
                  <span>Introduction to Algorithms</span> <span>Issue</span>{' '}
                  <span>09 Aug 2026</span> <span>23 Aug 2026</span> <span>-</span> <span>₹30</span>{' '}
                  <span className="badge badge-bad">Overdue</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">MI</div>
                    <div>
                      <strong>Meera Iyer</strong>
                    </div>
                  </div>
                  <span>Deep Work</span> <span>Return</span> <span>05 Aug 2026</span>{' '}
                  <span>19 Aug 2026</span> <span>22 Aug 2026</span> <span>₹30</span>{' '}
                  <span className="badge badge-good">Completed</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">KJ</div>
                    <div>
                      <strong>Karan Joshi</strong>
                    </div>
                  </div>
                  <span>The Midnight Library</span> <span>Issue</span> <span>02 Aug 2026</span>{' '}
                  <span>16 Aug 2026</span> <span>-</span> <span>₹0</span>{' '}
                  <span className="badge badge-good">On time</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AD</div>
                    <div>
                      <strong>Ananya Das</strong>
                    </div>
                  </div>
                  <span>The Pragmatic Programmer</span> <span>Issue</span> <span>01 Aug 2026</span>{' '}
                  <span>15 Aug 2026</span> <span>-</span> <span>₹110</span>{' '}
                  <span className="badge badge-bad">Overdue</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(140px,1.2fr) minmax(150px,1.3fr) 0.6fr 0.8fr 0.8fr 0.8fr 0.55fr 0.8fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">RS</div>
                    <div>
                      <strong>Riya Sinha</strong>
                    </div>
                  </div>
                  <span>Python Crash Course</span> <span>Return</span> <span>02 Aug 2026</span>{' '}
                  <span>16 Aug 2026</span> <span>15 Aug 2026</span> <span>₹0</span>{' '}
                  <span className="badge badge-good">Completed</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
              <div
                className="pagination-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '22px',
                }}
              >
                <button className="filter-button" disabled>
                  <i className="fa-solid fa-arrow-left" />
                </button>{' '}
                <button className="filter-button active-filter">1</button>{' '}
                <button className="filter-button">2</button>{' '}
                <button className="filter-button">3</button>{' '}
                <span style={{ color: '#6f645d', fontSize: '0.65rem' }}>...</span>{' '}
                <button className="filter-button">824</button>{' '}
                <button className="filter-button">
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
