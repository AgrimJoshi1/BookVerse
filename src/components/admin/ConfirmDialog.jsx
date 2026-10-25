import Modal from './Modal';

// Asks before doing something. Extra inputs (a reason, a date) go in children;
// `confirmDisabled` holds the button back until they are filled in.
export default function ConfirmDialog({
  title,
  confirmLabel = 'Confirm',
  danger = false,
  confirmDisabled = false,
  onConfirm,
  onCancel,
  children,
}) {
  return (
    <Modal
      title={title}
      onCancel={onCancel}
      onSubmit={(event) => {
        event.preventDefault();
        if (!confirmDisabled) onConfirm();
      }}
      footer={
        <>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={`btn ${danger ? 'btn-danger solid' : 'btn-primary'}`}
            disabled={confirmDisabled}
            autoFocus={!children || undefined}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
