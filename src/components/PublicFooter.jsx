import { Link } from 'react-router-dom';

function HomeFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/">
            <i className="fa-solid fa-book-open-reader" />
            <span>BookVerse</span>
          </Link>
          <p>A calm, modern home for the work behind every library.</p>
          <div className="social-links">
            <a href="#home" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="#home" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="#home" aria-label="X">
              <i className="fa-brands fa-x-twitter" />
            </a>
          </div>
        </div>
        <div>
          <h3>About</h3>
          <Link to="/about">Our story</Link>
          <Link to="/about">Our mission</Link>
          <Link to="/#features">Features</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@bookverse.example">Email us</a>
          <Link to="/contact">Send a message</Link>
          <Link to="/contact">Support</Link>
        </div>
        <div>
          <h3>Account</h3>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 BookVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}

function InnerFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <i className="fa-solid fa-book-open" /> BookVerse
          </Link>
          <p>
            A simpler and more organized way to manage books, members, borrowing, and returns.
          </p>
          <div className="social-links">
            <a href="#">
              <i className="fa-brands fa-github" />
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/product">Features</Link>
        </div>
        <div>
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Get Started</Link>
        </div>
        <div>
          <h3>Support</h3>
          <a href="#">Help Center</a>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 BookVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function PublicFooter({ home }) {
  return home ? <HomeFooter /> : <InnerFooter />;
}
