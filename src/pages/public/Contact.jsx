import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/contact.css?inline';

export default function Contact() {
  return (
    <>
      <title>Contact | BookVerse</title>

      <PageStyles css={css} />
      <main>
        {/* CONTACT HERO */}
        <section className="contact-hero">
          <div className="container contact-hero-content">
            <p className="eyebrow">CONTACT BOOKVERSE</p>
            <h1>
              Let's start a <span>conversation.</span>
            </h1>
            <p className="contact-hero-description">
              Have a question, need help, or want to know more about BookVerse? We'd love to hear
              from you.
            </p>
          </div>
        </section>
        {/* CONTACT SECTION */}
        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="container contact-grid">
            {/* CONTACT INFORMATION */}
            <div className="contact-info">
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>
                We'd love to <span>hear from you.</span>
              </h2>
              <p className="contact-info-description">
                Whether you have a question about BookVerse, need help, or simply want to share your
                thoughts, feel free to reach out to us.
              </p>
              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-icon">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div>
                    <span>Email us</span>{' '}
                    <a href="mailto:hello@bookverse.com">hello@bookverse.com</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-icon">
                    <i className="fa-solid fa-clock" />
                  </div>
                  <div>
                    <span>Support hours</span>
                    <p>Monday – Friday, 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-icon">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div>
                    <span>Based online</span>
                    <p>Supporting libraries everywhere.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* CONTACT FORM */}
            <div className="contact-form-wrapper">
              <h2>Send us a message</h2>
              <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Your name</label>{' '}
                  <input type="text" id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>{' '}
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>{' '}
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>{' '}
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <button type="submit" className="button send-message">
                  Send Message <i className="fa-solid fa-arrow-right" />
                </button>
              </form>
            </div>
          </div>
        </section>
        {/* OTHER WAYS TO CONNECT */}
        <section className="connect-section">
          <div className="container">
            <div className="connect-heading">
              <p className="eyebrow">EXPLORE BOOKVERSE</p>
              <h2>
                There is more to <span>discover.</span>
              </h2>
            </div>
            <div className="connect-list">
              <Link to="/" className="connect-item">
                <div className="connect-number">01</div>
                <div className="connect-content">
                  <h3>Explore BookVerse</h3>
                  <p>Discover what BookVerse can do for your library.</p>
                </div>
                <i className="fa-solid fa-arrow-right" />
              </Link>{' '}
              <Link to="/about" className="connect-item">
                <div className="connect-number">02</div>
                <div className="connect-content">
                  <h3>Learn about us</h3>
                  <p>Discover the story and ideas behind BookVerse.</p>
                </div>
                <i className="fa-solid fa-arrow-right" />
              </Link>{' '}
              <Link to="/register" className="connect-item">
                <div className="connect-number">03</div>
                <div className="connect-content">
                  <h3>Get started</h3>
                  <p>Create your account and start using BookVerse.</p>
                </div>
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
