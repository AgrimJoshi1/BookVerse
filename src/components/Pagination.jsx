// 1 … 4 5 6 … 21 style page list.
function pageList(current, total) {
  const pages = [];
  for (let page = 1; page <= total; page++) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) pages.push(page);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
}

// Page buttons for the librarian tables. Renders nothing when there is one page.
export default function Pagination({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null;

  return (
    <div className="pagination-row">
      <button
        type="button"
        className="filter-button"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-arrow-left" />
      </button>{' '}
      {pageList(page, pageCount).map((item, i) =>
        item === '…' ? (
          <span className="pagination-gap" key={`gap-${i}`}>
            ...
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={`filter-button${item === page ? ' active-filter' : ''}`}
            onClick={() => onPage(item)}
          >
            {item}
          </button>
        ),
      )}{' '}
      <button
        type="button"
        className="filter-button"
        disabled={page === pageCount}
        onClick={() => onPage(page + 1)}
        aria-label="Next page"
      >
        <i className="fa-solid fa-arrow-right" />
      </button>
    </div>
  );
}
