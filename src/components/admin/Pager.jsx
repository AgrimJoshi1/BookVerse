// 1 … 4 5 6 … 21 style page list.
function pageList(current, total) {
  const pages = [];
  for (let page = 1; page <= total; page++) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) pages.push(page);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
}

// Page buttons plus "11–20 of 24". Renders nothing when everything fits on one page.
export default function Pager({ page, pageCount, onPage, size, total }) {
  if (pageCount <= 1) return null;
  const from = (page - 1) * size + 1;
  const to = Math.min(total, page * size);

  return (
    <nav className="ad-pager" aria-label="Pages">
      <button type="button" disabled={page === 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
        ←
      </button>
      {pageList(page, pageCount).map((item, i) =>
        item === '…' ? (
          <span className="gap" key={`gap-${i}`}>
            …
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={item === page ? 'on' : undefined}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPage(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onPage(page + 1)}
        aria-label="Next page"
      >
        →
      </button>
      <span className="count">
        {from}–{to} of {total}
      </span>
    </nav>
  );
}
