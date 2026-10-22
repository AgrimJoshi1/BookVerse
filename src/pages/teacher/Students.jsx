import PageStyles from '../../components/PageStyles';
import css from '../../styles/teacher-students.css?inline';

export default function Students() {
  return (
    <>
      <title>Students | BookVerse</title>
      <meta name="description" content="Manage and view student borrowing activity in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">STUDENTS</p>
            <h1>
              Your class, <span>at a glance.</span>
            </h1>
            <p className="hero-description">
              Search and review every student's borrowing activity, overdue status, and contact
              details.
            </p>
            <div className="search-box" style={{ maxWidth: '560px', marginTop: '24px' }}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input type="text" placeholder="Search by name or student ID" />{' '}
              <button type="button">Search</button>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div className="filter-row">
              <span>Filter</span>{' '}
              <button className="filter-button active-filter">All students</button>{' '}
              <button className="filter-button">With overdue books</button>{' '}
              <button className="filter-button">Currently borrowing</button>{' '}
              <button className="filter-button">No active loans</button>
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">STUDENT LIST</p>
                  <h2>All students</h2>
                </div>
                <span className="panel-count">48 students</span>
              </div>
              <div className="data-table">
                <div
                  className="table-head"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <span>Student</span> <span>Student ID</span> <span>Class</span>{' '}
                  <span>Contact</span> <span>Borrowed</span> <span>Status</span> <span />
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">RM</div>
                    <div>
                      <strong>Rohan Mehta</strong> <small>BV2026CS017</small>
                    </div>
                  </div>
                  <span>BV2026CS017</span> <span>Grade 10 - A</span>{' '}
                  <span>rohan.m@student.edu</span> <span>2</span>{' '}
                  <span className="badge badge-good">On time</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">SK</div>
                    <div>
                      <strong>Sara Khan</strong> <small>BV2026CS022</small>
                    </div>
                  </div>
                  <span>BV2026CS022</span> <span>Grade 10 - A</span> <span>sara.k@student.edu</span>{' '}
                  <span>1</span> <span className="badge badge-good">On time</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AR</div>
                    <div>
                      <strong>Aditya Rao</strong> <small>BV2026CS009</small>
                    </div>
                  </div>
                  <span>BV2026CS009</span> <span>Grade 10 - B</span>{' '}
                  <span>aditya.r@student.edu</span> <span>2</span>{' '}
                  <span className="badge badge-bad">Overdue</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">MI</div>
                    <div>
                      <strong>Meera Iyer</strong> <small>BV2026CS031</small>
                    </div>
                  </div>
                  <span>BV2026CS031</span> <span>Grade 10 - B</span>{' '}
                  <span>meera.i@student.edu</span> <span>0</span>{' '}
                  <span className="badge badge-neutral">None</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">KS</div>
                    <div>
                      <strong>Kabir Singh</strong> <small>BV2026CS044</small>
                    </div>
                  </div>
                  <span>BV2026CS044</span> <span>Grade 10 - A</span>{' '}
                  <span>kabir.s@student.edu</span> <span>1</span>{' '}
                  <span className="badge badge-good">On time</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(160px,1.5fr) 0.8fr 0.7fr minmax(140px,1fr) 0.7fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-person">AD</div>
                    <div>
                      <strong>Ananya Das</strong> <small>BV2026CS038</small>
                    </div>
                  </div>
                  <span>BV2026CS038</span> <span>Grade 10 - B</span>{' '}
                  <span>ananya.d@student.edu</span> <span>3</span>{' '}
                  <span className="badge badge-bad">Overdue</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
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
