import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-staff.css?inline';

export default function Staff() {
  return (
    <>
      <title>Staff | BookVerse Admin</title>
      <meta name="description" content="Manage BookVerse staff accounts." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">STAFF</p>
            <h1>
              Your team <span>behind the desk.</span>
            </h1>
            <p className="hero-description">
              Manage teacher and librarian accounts, roles, and permissions across BookVerse.
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
                <input type="text" placeholder="Search by name, staff ID, or email" />{' '}
                <button type="button">Search</button>
              </div>
              <button
                className="light-button"
                type="button"
                onClick={() =>
                  document.getElementById('add-staff-panel')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <i className="fa-solid fa-user-tie" /> Add staff
              </button>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              <div className="filter-row" style={{ marginTop: '0' }}>
                <span>Role</span> <button className="filter-button active-filter">All staff</button>{' '}
                <button className="filter-button">Teachers</button>{' '}
                <button className="filter-button">Librarians</button>{' '}
                <button className="filter-button">Admins</button>
              </div>
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">STAFF LIST</p>
                    <h2>All staff</h2>
                  </div>
                  <span className="panel-count">24 staff</span>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <span>Staff</span> <span>Staff ID</span> <span>Email</span> <span>Role</span>{' '}
                    <span>Added</span> <span>Status</span> <span />
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(160px,1.5fr) 0.85fr minmax(150px,1.2fr) 0.8fr 0.7fr 0.8fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">PN</div>
                      <div>
                        <strong>Priya Nair</strong>
                        <small>Computer Science</small>
                      </div>
                    </div>
                    <span>BV2026TCH014</span> <span>priya.nair@bookverse.edu</span>{' '}
                    <span>Teacher</span> <span>Jul 2021</span>{' '}
                    <span className="badge badge-good">Active</span>{' '}
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
                      <div className="mini-person">KJ</div>
                      <div>
                        <strong>Karan Joshi</strong>
                        <small>Central Library</small>
                      </div>
                    </div>
                    <span>BV2026LIB003</span> <span>karan.j@bookverse.edu</span>{' '}
                    <span>Librarian</span> <span>Feb 2020</span>{' '}
                    <span className="badge badge-good">Active</span>{' '}
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
                      <div className="mini-person">SV</div>
                      <div>
                        <strong>Sunita Verma</strong>
                        <small>Administration</small>
                      </div>
                    </div>
                    <span>BV2026ADM002</span> <span>sunita.v@bookverse.edu</span> <span>Admin</span>{' '}
                    <span>Apr 2019</span> <span className="badge badge-good">Active</span>{' '}
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
                      <div className="mini-person">RD</div>
                      <div>
                        <strong>Rakesh Dutta</strong>
                        <small>Mathematics</small>
                      </div>
                    </div>
                    <span>BV2026TCH021</span> <span>rakesh.d@bookverse.edu</span>{' '}
                    <span>Teacher</span> <span>Aug 2022</span>{' '}
                    <span className="badge badge-good">Active</span>{' '}
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
                      <div className="mini-person">TL</div>
                      <div>
                        <strong>Tara Lobo</strong>
                        <small>Central Library</small>
                      </div>
                    </div>
                    <span>BV2026LIB007</span> <span>tara.l@bookverse.edu</span>{' '}
                    <span>Librarian</span> <span>Mar 2023</span>{' '}
                    <span className="badge badge-neutral">Deactivated</span>{' '}
                    <a href="#" className="row-action">
                      Manage <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </section>
            </div>
            {/* SIDEBAR: ADD STAFF */}
            <aside className="page-sidebar">
              <section className="side-card" id="add-staff-panel">
                <p className="eyebrow">ADD STAFF</p>
                <h2 style={{ fontSize: '1.05rem' }}>Onboard a staff account</h2>
                <div
                  className="form-grid"
                  style={{ gridTemplateColumns: '1fr', marginTop: '16px' }}
                >
                  <div className="form-group">
                    <label htmlFor="staff-name">Full name</label>{' '}
                    <input type="text" id="staff-name" placeholder="e.g. Neha Verma" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="staff-email">Email address</label>{' '}
                    <input type="email" id="staff-email" placeholder="name@bookverse.edu" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="staff-role">Role</label>{' '}
                    <select id="staff-role">
                      <option>Teacher</option>
                      <option>Librarian</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="staff-dept">Department</label>{' '}
                    <input type="text" id="staff-dept" placeholder="e.g. Computer Science" />
                  </div>
                </div>
                <button
                  className="light-button"
                  type="button"
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  Add staff account <i className="fa-solid fa-user-tie" />
                </button>
              </section>
              <section className="side-card">
                <p className="eyebrow">STAFF SNAPSHOT</p>
                <h2 style={{ fontSize: '1.05rem' }}>At a glance</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Total staff</span> <strong>24</strong>
                </div>
                <div className="summary-line">
                  <span>Teachers</span> <strong>17</strong>
                </div>
                <div className="summary-line">
                  <span>Librarians</span> <strong>5</strong>
                </div>
                <div className="summary-line">
                  <span>Admins</span> <strong>2</strong>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
