import Modal from './Modal';

// A dialog around a small form. `onSubmit` runs on Enter or on the submit button.
export default function FormDialog({ title, submitLabel, onSubmit, onCancel, children }) {
  return (
    <Modal
      title={title}
      onCancel={onCancel}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      footer={
        <>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
