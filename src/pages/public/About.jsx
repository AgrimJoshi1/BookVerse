import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/about.css?inline';

export default function About() {
  return (
    <>
      <title>About | BookVerse</title>

      <PageStyles css={css} />
      <main>
        {/* ABOUT HERO */}
        <section className="about-hero">
          <div className="container about-hero-content">
            <p className="eyebrow">ABOUT BOOKVERSE</p>
            <h1>
              Built around books. <span>Designed around people.</span>
            </h1>
            <p className="about-hero-description">
              BookVerse is built to make library management simpler, bringing books, members, and
              everyday circulation together in one organized space.
            </p>
            <a href="#our-story" className="about-scroll">
              Explore Our Story <i className="fa-solid fa-arrow-down" />
            </a>
          </div>
        </section>
        {/* OUR STORY */}
        {/* OUR STORY */}
        <section className="our-story" id="our-story">
          <div className="container our-story-grid">
            <div className="our-story-content">
              <p className="eyebrow">OUR STORY</p>
              <h2>
                Built from a simple idea: <span>library management should feel simple.</span>
              </h2>
              <p>
                Managing a library often means keeping track of books, members, availability,
                borrowing records, and returns. BookVerse was created around one simple goal —
                bringing all of that together in one organized place.
              </p>
              <p>
                Instead of making library management feel complicated, we wanted to create a system
                that feels clear, practical, and easy to use from day one.
              </p>
              <div className="story-highlights">
                <div>
                  <i className="fa-solid fa-book" /> <span>Books organized</span>
                </div>
                <div>
                  <i className="fa-solid fa-users" /> <span>People connected</span>
                </div>
                <div>
                  <i className="fa-solid fa-layer-group" /> <span>Everything together</span>
                </div>
              </div>
            </div>
            <div className="story-visual">
              <div className="story-image" />
              <div className="story-overlay">
                <p>THE BOOKVERSE IDEA</p>
                <h3>
                  Simple tools. <span>Better libraries.</span>
                </h3>
              </div>
            </div>
          </div>
        </section>
        {/* WHAT WE BELIEVE */}
        <section className="what-we-believe">
          <div className="container">
            <div className="belief-heading">
              <p className="eyebrow">WHAT WE BELIEVE</p>
              <h2>
                Good library tools should <span>work quietly in the background.</span>
              </h2>
            </div>
            <div className="belief-list">
              <div className="belief-item">
                <div className="belief-number">01</div>
                <div className="belief-content">
                  <h3>Keep it simple</h3>
                  <p>
                    Technology should make everyday library tasks easier, not add more complexity to
                    them.
                  </p>
                </div>
                <i className="fa-solid fa-arrow-right" />
              </div>
              <div className="belief-item">
                <div className="belief-number">02</div>
                <div className="belief-content">
                  <h3>Keep everything connected</h3>
                  <p>
                    Books, members, borrowing, and returns should all work together in one organized
                    system.
                  </p>
                </div>
                <i className="fa-solid fa-arrow-right" />
              </div>
              <div className="belief-item">
                <div className="belief-number">03</div>
                <div className="belief-content">
                  <h3>Focus on people</h3>
                  <p>
                    Behind every library are people, and the tools they use should feel clear,
                    practical, and easy.
                  </p>
                </div>
                <i className="fa-solid fa-arrow-right" />
              </div>
            </div>
          </div>
        </section>
        {/* OUR MISSION */}
        <section className="our-mission">
          <div className="container mission-content">
            <p className="eyebrow">OUR MISSION</p>
            <h2>
              Making library management <span>feel less like administration.</span>
            </h2>
            <p className="mission-description">
              We believe managing a library should not be complicated. BookVerse brings the everyday
              work behind books, members, borrowing, and returns into one simple and organized
              experience.
            </p>
            <div className="mission-points">
              <div className="mission-point">
                <i className="fa-solid fa-book-open" />
                <div>
                  <h3>Simplify the everyday</h3>
                  <p>Make common library tasks easier to manage and quicker to understand.</p>
                </div>
              </div>
              <div className="mission-point">
                <i className="fa-solid fa-users" />
                <div>
                  <h3>Put people first</h3>
                  <p>Create tools that feel practical and natural for the people who use them.</p>
                </div>
              </div>
              <div className="mission-point">
                <i className="fa-solid fa-arrow-right-arrow-left" />
                <div>
                  <h3>Keep everything moving</h3>
                  <p>Help books, members, borrowing, and returns stay connected in one place.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="about-cta">
          <div className="container about-cta-content">
            <p className="eyebrow">READY TO GET STARTED?</p>
            <h2>
              A better way to manage <span>your library starts here.</span>
            </h2>
            <p className="about-cta-description">
              Bring your books, members, borrowing, and returns together in one simple and organized
              space.
            </p>
            <div className="about-cta-actions">
              <Link to="/register" className="button">
                Get Started <i className="fa-solid fa-arrow-right" />
              </Link>{' '}
              <Link to="/" className="about-cta-link">
                Explore BookVerse
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
