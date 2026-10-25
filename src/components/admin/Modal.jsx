import { useEffect, useRef } from 'react';

// A native <dialog> opened as a modal. Mount it to show it, unmount to close.
// Esc and a click on the backdrop both call `onCancel`.
export default function Modal({ title, onCancel, onSubmit, children, footer }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const Shell = onSubmit ? 'form' : 'div';

  return (
    <dialog
      ref={ref}
      className="ad-dialog"
      aria-labelledby="ad-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => event.target === ref.current && onCancel()}
    >
      <Shell onSubmit={onSubmit} noValidate>
        <div className="ad-dialog-body">
          <h2 id="ad-dialog-title">{title}</h2>
          {children}
        </div>
        <div className="ad-dialog-foot">{footer}</div>
      </Shell>
    </dialog>
  );
}
