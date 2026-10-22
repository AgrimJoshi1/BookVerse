import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/style.css?inline';

// The splash only plays on the first load of the app, not on every return to "/".
let splashShown = false;

export default function Home() {
  const [showSplash] = useState(() => {
    const show = !splashShown;
    splashShown = true;
    return show;
  });

  return (
    <>
      <title>BookVerse | A calmer way to run a library</title>
      <meta
        name="description"
        content="BookVerse is a calm, modern system for running a library's catalog, members, and circulation."
      />
      <PageStyles css={css} />
      {showSplash && (
        <div className="loading-screen" role="status" aria-label="Loading BookVerse">
          <div className="loading-panel">
            <span className="loading-brand">
              <i className="fa-solid fa-book-open-reader" />
              <span>BookVerse</span>
            </span>
            <span className="loading-spinner" aria-hidden="true" />
            <p>Loading your library…</p>
          </div>
        </div>
      )}
      <main>
        {/* HERO */}
        <section className="hero section">
          <div className="container hero-content">
            <div className="hero-copy">
              <h1 id="hero-title">
                Every book has a home <span>So does the work of running one</span>
              </h1>
              <p className="hero-description">
                BookVerse keeps your catalog, members, and circulation in one calm system built for
                the people who quietly keep a library running
              </p>
              <p className="hero-note" />
            </div>
          </div>
        </section>
        {/* FEATURES */}
        <section className="what-you-can-do" id="features">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">BookVerse Features</p>
              <h2 id="features-title">Everything you need to run your library.</h2>
              <p>
                From organizing books to managing members and tracking every loan, BookVerse keeps
                your entire library in one place.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <span className="feature-icon">
                  <i className="fa-solid fa-book" />
                </span>
                <h3>Catalog</h3>
                <p>Titles, copies, categories, and shelf locations — organized and easy to find.</p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <i className="fa-solid fa-users" />
                </span>
                <h3>Members</h3>
                <p>
                  A clean record for every reader: history, holds, and contact details in one place.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <i className="fa-solid fa-right-from-bracket" />
                </span>
                <h3>Issue a book</h3>
                <p>Scan, assign, done. Due dates are set automatically from your loan policy.</p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <i className="fa-solid fa-rotate-left" />
                </span>
                <h3>Return a book</h3>
                <p>Process returns and fines in seconds, with no paper log to reconcile later.</p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <i className="fa-solid fa-folder-open" />
                </span>
                <h3>Digital records</h3>
                <p>
                  Your full lending history, searchable, backed up, and never in a filing cabinet.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <i className="fa-solid fa-chart-line" />
                </span>
                <h3>Reports</h3>
                <p>See what's overdue, what's popular, and what's gathering dust — at a glance.</p>
              </article>
            </div>
          </div>
        </section>
        {/* HOW IT WORKS */}
        <section className="how-it-works">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Simple by design</p>
              <h2>Your library, organized in a few simple steps.</h2>
              <p>
                No complicated setup. Just add your books, manage your members, and keep track of
                every loan.
              </p>
            </div>
            <div className="steps-grid">
              <article className="step-card">
                <span className="step-number">01</span>
                <div className="step-icon">
                  <i className="fa-solid fa-book" />
                </div>
                <h3>Add your books</h3>
                <p>
                  Build your catalog with titles, authors, categories, copies, and shelf locations.
                </p>
              </article>
              <article className="step-card">
                <span className="step-number">02</span>
                <div className="step-icon">
                  <i className="fa-solid fa-users" />
                </div>
                <h3>Add your members</h3>
                <p>
                  Keep every reader organized with their information, borrowing history, and active
                  loans.
                </p>
              </article>
              <article className="step-card">
                <span className="step-number">03</span>
                <div className="step-icon">
                  <i className="fa-solid fa-right-left" />
                </div>
                <h3>Manage circulation</h3>
                <p>
                  Issue and return books while BookVerse keeps your records and due dates organized.
                </p>
              </article>
            </div>
          </div>
        </section>
        {/* WHY BOOKVERSE */}
        <section className="why-bookverse">
          <div className="container why-bookverse-grid">
            <div className="why-visual">
              <div className="why-image" />
            </div>
            <div className="why-content">
              <p className="eyebrow">Why BookVerse</p>
              <h2>
                Less time managing records. <span>More time for your library.</span>
              </h2>
              <p className="why-description">
                BookVerse brings the everyday work of running a library into one simple system, so
                you can spend less time dealing with paperwork and more time with your collection
                and readers.
              </p>
              <div className="why-points">
                <div className="why-point">
                  <div className="why-point-icon">
                    <i className="fa-solid fa-arrow-right" />
                  </div>
                  <div>
                    <h3>Simple from day one</h3>
                    <p>
                      No complicated setup or overwhelming tools. Start organizing your library
                      right away.
                    </p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="why-point-icon">
                    <i className="fa-solid fa-arrow-right" />
                  </div>
                  <div>
                    <h3>Everything in one place</h3>
                    <p>
                      Books, members, loans, returns, and records stay organized inside one system.
                    </p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="why-point-icon">
                    <i className="fa-solid fa-arrow-right" />
                  </div>
                  <div>
                    <h3>Built for real libraries</h3>
                    <p>
                      Designed around the everyday work librarians actually do, without unnecessary
                      complexity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="final-cta">
          <div className="container">
            <div className="final-cta-content">
              <p>BOOKVERSE LIBRARY SYSTEM</p>
              <h2>
                Ready to bring your library <span>together?</span>
              </h2>
              <p className="final-cta-description">
                Organize your books, members, and daily circulation in one simple place.
              </p>
              <div className="final-cta-buttons">
                <Link to="/register" className="button">
                  Get Started <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/login" className="cta-login">
                  Already have an account? <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
