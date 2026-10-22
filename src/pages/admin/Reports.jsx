import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-reports.css?inline';

export default function Reports() {
  return (
    <>
      <title>Reports | BookVerse Admin</title>
      <meta name="description" content="BookVerse library reports and statistics." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">REPORTS</p>
            <h1>
              See how the <span>library is used.</span>
            </h1>
            <p className="hero-description">
              Circulation trends, popular titles, and overdue and membership statistics for the
              current period.
            </p>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div className="reports-grid">
              {/* MOST BORROWED */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">MOST BORROWED</p>
                    <h2>Top titles this month</h2>
                  </div>
                  <span className="panel-count">Top 5</span>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{ gridTemplateColumns: 'minmax(150px,1.6fr) 0.8fr 0.8fr' }}
                  >
                    <span>Title</span> <span>Category</span> <span>Times borrowed</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.6fr) 0.8fr 0.8fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Atomic Habits</strong>
                      </div>
                    </div>
                    <span>Self Development</span> <strong>68</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.6fr) 0.8fr 0.8fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Clean Code</strong>
                      </div>
                    </div>
                    <span>Programming</span> <strong>54</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.6fr) 0.8fr 0.8fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>The Midnight Library</strong>
                      </div>
                    </div>
                    <span>Fiction</span> <strong>49</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.6fr) 0.8fr 0.8fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Hands-On Machine Learning</strong>
                      </div>
                    </div>
                    <span>AI &amp; ML</span> <strong>41</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.6fr) 0.8fr 0.8fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Deep Work</strong>
                      </div>
                    </div>
                    <span>Self Development</span> <strong>37</strong>
                  </div>
                </div>
              </section>
              {/* OVERDUE BOOKS */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">OVERDUE BOOKS</p>
                    <h2>Currently past due</h2>
                  </div>
                  <span className="panel-count">37 total</span>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{ gridTemplateColumns: 'minmax(140px,1.3fr) minmax(120px,1.3fr) 0.7fr' }}
                  >
                    <span>Book</span> <span>Borrower</span> <span>Days overdue</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(140px,1.3fr) minmax(120px,1.3fr) 0.7fr' }}
                  >
                    <span>Introduction to Algorithms</span> <span>Alex Sharma</span>{' '}
                    <span className="badge badge-bad">2 days</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(140px,1.3fr) minmax(120px,1.3fr) 0.7fr' }}
                  >
                    <span>Introduction to Algorithms</span> <span>Aditya Rao</span>{' '}
                    <span className="badge badge-bad">3 days</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(140px,1.3fr) minmax(120px,1.3fr) 0.7fr' }}
                  >
                    <span>The Pragmatic Programmer</span> <span>Ananya Das</span>{' '}
                    <span className="badge badge-bad">11 days</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(140px,1.3fr) minmax(120px,1.3fr) 0.7fr' }}
                  >
                    <span>Design Patterns</span> <span>Kabir Singh</span>{' '}
                    <span className="badge badge-bad">6 days</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(140px,1.3fr) minmax(120px,1.3fr) 0.7fr' }}
                  >
                    <span>Database System Concepts</span> <span>Varun Gupta</span>{' '}
                    <span className="badge badge-bad">14 days</span>
                  </div>
                </div>
              </section>
              {/* ACTIVE MEMBERS */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">ACTIVE MEMBERS</p>
                    <h2>Most active this month</h2>
                  </div>
                  <span className="panel-count">Top 5</span>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{ gridTemplateColumns: 'minmax(150px,1.5fr) 0.9fr 0.7fr' }}
                  >
                    <span>Member</span> <span>Type</span> <span>Books borrowed</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.5fr) 0.9fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">PN</div>
                      <div>
                        <strong>Priya Nair</strong>
                      </div>
                    </div>
                    <span>Teacher</span> <strong>14</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.5fr) 0.9fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">KS</div>
                      <div>
                        <strong>Kabir Singh</strong>
                      </div>
                    </div>
                    <span>Student</span> <strong>9</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.5fr) 0.9fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">AS</div>
                      <div>
                        <strong>Alex Sharma</strong>
                      </div>
                    </div>
                    <span>Student</span> <strong>8</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.5fr) 0.9fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">RD</div>
                      <div>
                        <strong>Rakesh Dutta</strong>
                      </div>
                    </div>
                    <span>Teacher</span> <strong>7</strong>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.5fr) 0.9fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">MI</div>
                      <div>
                        <strong>Meera Iyer</strong>
                      </div>
                    </div>
                    <span>Student</span> <strong>6</strong>
                  </div>
                </div>
              </section>
              {/* CIRCULATION STATS */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">CIRCULATION</p>
                    <h2>Loans per month</h2>
                  </div>
                  <span className="panel-count">Last 6 months</span>
                </div>
                <div className="bar-chart">
                  <div className="bar-row">
                    <span className="bar-label">Mar</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '62%' }} />
                    </div>
                    <strong className="bar-value">642</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">Apr</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '71%' }} />
                    </div>
                    <strong className="bar-value">734</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">May</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '58%' }} />
                    </div>
                    <strong className="bar-value">598</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">Jun</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '44%' }} />
                    </div>
                    <strong className="bar-value">451</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">Jul</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '69%' }} />
                    </div>
                    <strong className="bar-value">712</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">Aug</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '100%' }} />
                    </div>
                    <strong className="bar-value">1,042</strong>
                  </div>
                </div>
                <div className="panel-heading" style={{ marginTop: '26px', marginBottom: '14px' }}>
                  <div>
                    <p className="eyebrow">BY CATEGORY</p>
                    <h2 style={{ fontSize: '1.1rem' }}>Loans by category</h2>
                  </div>
                </div>
                <div className="bar-chart">
                  <div className="bar-row">
                    <span className="bar-label">Fiction</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '100%' }} />
                    </div>
                    <strong className="bar-value">312</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">Programming</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '84%' }} />
                    </div>
                    <strong className="bar-value">261</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">Self Dev.</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '76%' }} />
                    </div>
                    <strong className="bar-value">238</strong>
                  </div>
                  <div className="bar-row">
                    <span className="bar-label">AI &amp; ML</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '52%' }} />
                    </div>
                    <strong className="bar-value">163</strong>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
