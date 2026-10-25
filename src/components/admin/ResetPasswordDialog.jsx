import { useState } from 'react';
import { ApiError, useLibrary } from '../../context/LibraryContext';
import PasswordChecklist from '../PasswordChecklist';
import Field from './Field';
import FormDialog from './FormDialog';

// Admin gives someone a new temporary password. They must replace it when they
// next log in. `person` is the member or staff record being reset.
export default function ResetPasswordDialog({ person, onCancel, onDone }) {
  const { resetPassword } = useLibrary();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setError('');
    try {
      await resetPassword(person.id, password);
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setError(err.fields.password ?? err.message);
      setBusy(false);
      return;
    }
    onDone(`Reset the password for ${person.name}. They must choose a new one at next login.`);
  }

  return (
    <FormDialog
      title={`Reset password for ${person.name}`}
      submitLabel={busy ? 'Resetting…' : 'Reset password'}
      onSubmit={submit}
      onCancel={onCancel}
    >
      <Field
        id="reset-password"
        label="Temporary password"
        type="text"
        autoFocus
        autoComplete="off"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={error}
        hint="Tell them this password. They will be asked to choose their own at next login."
      />
      <PasswordChecklist value={password} />
    </FormDialog>
  );
}
