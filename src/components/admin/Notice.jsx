// A one-line status message. Dismissable when `onClose` is given.
export default function Notice({ tone, onClose, children }) {
  return (
    <div className={`ad-notice${tone ? ` ${tone}` : ''}`} role="status">
      <p>{children}</p>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss">
          Dismiss
        </button>
      )}
    </div>
  );
}
