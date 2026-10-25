import { useState } from 'react';
import { rupees, useLibrary } from '../../context/LibraryContext';
import ConfirmDialog from './ConfirmDialog';
import Field from './Field';

// Waiving needs a reason, which is kept on the fine and in the activity log.
export default function WaiveDialog({ fine, onClose }) {
  const { getStudent, waiveFine } = useLibrary();
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <ConfirmDialog
      title={`Waive ${rupees(fine.amount)}?`}
      confirmLabel="Waive fine"
      confirmDisabled={!reason.trim() || busy}
      onCancel={() => onClose(false)}
      onConfirm={async () => {
        setBusy(true);
        await waiveFine(fine.id, reason);
        onClose(true);
      }}
    >
      <p>
        {getStudent(fine.studentId).name} will no longer owe this fine. It stays on record as waived.
      </p>
      <Field
        id="waive-reason"
        label="Reason"
        placeholder="e.g. Library closed on the due date"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        autoFocus
      />
    </ConfirmDialog>
  );
}
