import { useState } from 'react';

const VISUALS = ['visual-one', 'visual-two', 'visual-three', 'visual-four', 'visual-five', 'visual-six'];

// The real cover from Open Library (looked up by ISBN). With no cover on file,
// or no internet, it falls back to a coloured book so the layout never breaks.
export default function BookCover({ book, index = 0, className = '' }) {
  const [failed, setFailed] = useState(false);
  const isbn = (book.isbn ?? '').replace(/[\s-]/g, '');

  if (failed || !isbn) {
    return (
      <div className={`cover-fallback ${VISUALS[index % VISUALS.length]} ${className}`} role="img" aria-label={`Cover of ${book.title}`}>
        <i className="fa-solid fa-book-open" />
      </div>
    );
  }

  return (
    <img
      className={`cover-img ${className}`}
      src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`}
      alt={`Cover of ${book.title}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
