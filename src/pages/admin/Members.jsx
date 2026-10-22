import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-members.css?inline';

export default function Members() {
  return (
    <>
      <title>Members | BookVerse Admin</title>
      <meta name="description" content="Manage BookVerse library members." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">MEMBERS</p>
            <h1>
              Every member, <span>one directory.</span>
            </h1>
            <p className="hero-description">
              Search members, review loan activity, and manage accounts across the whole library.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginTop: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div className="search-box" style={{ maxWidth: '560px', flex: '1' }}>
                <i className="fa-solid fa-magnifying-glass" />{' '}
                <input type="text" placeholder="Search by name, member ID, or email" />{' '}
                <button type="button">Search</button>
              </div>
              <button
                className="light-button"
                type="button"
                onClick={() =>
                  document
                    .getElementById('add-member-panel')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <i className="fa-solid fa-user-plus" /> Add member
              </button>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              <div className="filter-row" style={{ marginTop: '0' }}>
                <span>Filter</span>{' '}
                <button className="filter-button active-filter">All members</button>{' '}
                <button className="filter-button">Active</button>{' '}
                <button className="filter-button">Suspended</button>{' '}
                <button className="filter-button">With overdue books</button>
              </div>
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">MEMBER LIST</p>
                    <h2>All members</h2>
                  </div>
                  <span className="panel-count">612 members</span>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <span>Member</span> <span>Member ID</span> <span>Email</span>{' '}
                    <span>Joined</span> <span>Loans</span> <span>Status</span> <span />
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">AS</div>
                      <div>
                        <strong>Alex Sharma</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>BV2026CS041</span> <span>alex.sharma@student.edu</span>{' '}
                    <span>Aug 2024</span> <span>3</span>{' '}
                    <span className="badge badge-bad">Overdue</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">RM</div>
                      <div>
                        <strong>Rohan Mehta</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>BV2026CS017</span> <span>rohan.m@student.edu</span> <span>Jul 2024</span>{' '}
                    <span>2</span> <span className="badge badge-good">Active</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">SK</div>
                      <div>
                        <strong>Sara Khan</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>BV2026CS022</span> <span>sara.k@student.edu</span> <span>Jul 2024</span>{' '}
                    <span>1</span> <span className="badge badge-good">Active</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">AR</div>
                      <div>
                        <strong>Aditya Rao</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>BV2026CS009</span> <span>aditya.r@student.edu</span> <span>Jun 2024</span>{' '}
                    <span>2</span> <span className="badge badge-bad">Overdue</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">MI</div>
                      <div>
                        <strong>Meera Iyer</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>BV2026CS031</span> <span>meera.i@student.edu</span> <span>Sep 2024</span>{' '}
                    <span>0</span> <span className="badge badge-neutral">Active</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">VG</div>
                      <div>
                        <strong>Varun Gupta</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>BV2025CS063</span> <span>varun.g@student.edu</span> <span>Jan 2025</span>{' '}
                    <span>0</span> <span className="badge badge-warn">Suspended</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
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
                  <button className="filter-button">52</button>{' '}
                  <button className="filter-button">
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </div>
              </section>
            </div>
            {/* SIDEBAR: ADD MEMBER */}
            <aside className="page-sidebar">
              <section className="side-card" id="add-member-panel">
                <p className="eyebrow">ADD MEMBER</p>
                <h2 style={{ fontSize: '1.05rem' }}>Register a member</h2>
                <div
                  className="form-grid"
                  style={{ gridTemplateColumns: '1fr', marginTop: '16px' }}
                >
                  <div className="form-group">
                    <label htmlFor="member-name">Full name</label>{' '}
                    <input type="text" id="member-name" placeholder="e.g. Neha Verma" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="member-email">Email address</label>{' '}
                    <input type="email" id="member-email" placeholder="name@student.edu" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="member-type">Membership type</label>{' '}
                    <select id="member-type">
                      <option>Student</option>
                      <option>Teacher</option>
                      <option>Staff</option>
                      <option>Guest</option>
                    </select>
                  </div>
                </div>
                <button
                  className="light-button"
                  type="button"
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  Add member <i className="fa-solid fa-user-plus" />
                </button>
              </section>
              <section className="side-card">
                <p className="eyebrow">MEMBER SNAPSHOT</p>
                <h2 style={{ fontSize: '1.05rem' }}>At a glance</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Total members</span> <strong>612</strong>
                </div>
                <div className="summary-line">
                  <span>Active accounts</span> <strong>594</strong>
                </div>
                <div className="summary-line">
                  <span>Suspended</span> <strong>18</strong>
                </div>
                <div className="summary-line">
                  <span>With overdue books</span> <strong>29</strong>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
