import { useState } from 'react';
import { today } from '../../api/engine';
import { lateness, plural, rupees, useLibrary } from '../../context/LibraryContext';
import ConfirmDialog from './ConfirmDialog';
import Field from './Field';

// Confirms a return, with the return date and the fine it would earn.
export default function ReturnDialog({ loan, onClose }) {
  const { getBook, getStudent, returnLoan, settings } = useLibrary();
  const [date, setDate] = useState(today());
  const [busy, setBusy] = useState(false);

  const valid = /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= loan.issuedOn;
  const late = valid ? lateness(loan, date, settings) : { days: 0, chargeable: 0, fine: 0 };

  return (
    <ConfirmDialog
      title="Return this book?"
      confirmLabel="Return book"
      confirmDisabled={!valid || busy}
      onCancel={() => onClose(null)}
      onConfirm={async () => {
        setBusy(true);
        await returnLoan(loan.id, date);
        onClose({ book: getBook(loan.bookId).title, member: getStudent(loan.studentId).name, fine: late.fine });
      }}
    >
      <p>
        “{getBook(loan.bookId).title}” from {getStudent(loan.studentId).name}.
      </p>
      <Field
        id="return-date"
        label="Returned on"
        type="date"
        min={loan.issuedOn}
        value={date}
        onChange={(event) => setDate(event.target.value)}
        error={valid ? '' : `Pick a date on or after ${loan.issuedOn}.`}
      />
      {valid && (
        <p className="ad-preview">
          {late.days === 0
            ? 'On time, so no fine.'
            : late.fine > 0
              ? `${plural(late.days, 'day')} late. Fine: `
              : `${plural(late.days, 'day')} late, within the grace period. Fine: `}
          {late.days > 0 && <strong>{rupees(late.fine)}</strong>}
        </p>
      )}
    </ConfirmDialog>
  );
}
