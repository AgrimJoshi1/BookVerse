import { useState } from 'react';

// Slices `items` into pages. Changing `resetKey` (the active filter and search)
// sends the list back to page 1.
export default function usePaging(items, size, resetKey) {
  const [state, setState] = useState({ page: 1, key: resetKey });
  const pageCount = Math.max(1, Math.ceil(items.length / size));
  const page = Math.min(state.key === resetKey ? state.page : 1, pageCount);

  return {
    page,
    pageCount,
    size,
    total: items.length,
    rows: items.slice((page - 1) * size, page * size),
    setPage: (next) => setState({ page: next, key: resetKey }),
  };
}
