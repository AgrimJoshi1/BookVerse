import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-fines.css?inline';

export default function Fines() {
  return (
    <>
      <title>Fines | BookVerse Admin</title>
      <meta name="description" content="Manage fines across BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">FINES</p>
            <h1>
              Fines, <span>across every account.</span>
            </h1>
            <p className="hero-description">
              Track outstanding and paid fines for every member and staff account in the library.
            </p>
            <div className="search-box" style={{ maxWidth: '560px', marginTop: '24px' }}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input type="text" placeholder="Search by member or book" />{' '}
              <button type="button">Search</button>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div
              className="stats-grid"
              style={{ marginTop: '0', marginBottom: '26px', gridTemplateColumns: 'repeat(4,1fr)' }}
            >
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-indian-rupee-sign" />
                </div>
                <div>
                  <span>Total fines issued</span> <strong>₹23,180</strong>
                </div>
              </article>
              <article className="stat-card stat-card-good">
                <div className="stat-icon">
                  <i className="fa-regular fa-circle-check" />
                </div>
                <div>
                  <span>Total collected</span> <strong>₹18,420</strong>
                </div>
              </article>
              <article className="stat-card stat-card-warning">
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Total outstanding</span> <strong>₹4,760</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-receipt" />
                </div>
                <div>
                  <span>Fine records</span> <strong>486</strong>
                </div>
              </article>
            </div>
            <div className="filter-row" style={{ marginTop: '0' }}>
              <span>Status</span> <button className="filter-button active-filter">All fines</button>{' '}
              <button className="filter-button">Unpaid</button>{' '}
              <button className="filter-button">Paid</button>
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">FINE RECORDS</p>
                  <h2>All fines</h2>
                </div>
                <span className="panel-count">486 records</span>
              </div>
              <div className="data-table">
                <div
                  className="table-head"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <span>Member</span> <span>Book</span> <span>Amount</span> <span>Reason</span>{' '}
                  <span>Date</span> <span>Status</span> <span />
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AS</div>
                    <div>
                      <strong>Alex Sharma</strong>
                    </div>
                  </div>
                  <span>Introduction to Algorithms</span> <strong>₹20</strong> <span>Overdue</span>{' '}
                  <span>23 Aug 2026</span> <span className="badge badge-bad">Unpaid</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AR</div>
                    <div>
                      <strong>Aditya Rao</strong>
                    </div>
                  </div>
                  <span>Introduction to Algorithms</span> <strong>₹30</strong> <span>Overdue</span>{' '}
                  <span>23 Aug 2026</span> <span className="badge badge-bad">Unpaid</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AD</div>
                    <div>
                      <strong>Ananya Das</strong>
                    </div>
                  </div>
                  <span>The Pragmatic Programmer</span> <strong>₹110</strong> <span>Overdue</span>{' '}
                  <span>15 Aug 2026</span> <span className="badge badge-bad">Unpaid</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">MI</div>
                    <div>
                      <strong>Meera Iyer</strong>
                    </div>
                  </div>
                  <span>Deep Work</span> <strong>₹30</strong> <span>Overdue</span>{' '}
                  <span>19 Aug 2026</span> <span className="badge badge-good">Paid</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">KS</div>
                    <div>
                      <strong>Kabir Singh</strong>
                    </div>
                  </div>
                  <span>Design Patterns</span> <strong>₹15</strong> <span>Damaged copy</span>{' '}
                  <span>10 Aug 2026</span> <span className="badge badge-good">Paid</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(150px,1.3fr) minmax(150px,1.3fr) 0.6fr 0.9fr 0.7fr 0.7fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">RS</div>
                    <div>
                      <strong>Riya Sinha</strong>
                    </div>
                  </div>
                  <span>Python Crash Course</span> <strong>₹0</strong> <span>—</span>{' '}
                  <span>15 Aug 2026</span> <span className="badge badge-neutral">Waived</span>{' '}
                  <a href="#" className="row-action">
                    Details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
