import { useState } from 'react';

const OTHER = '__other__';

// A dropdown of departments plus "Other…", which reveals a text box so someone
// can write in a department that is not on the list. `value` is always the
// final department text; `inputClass` styles the controls for the page it is in.
export default function DepartmentSelect({ id, value, options, onChange, inputClass = '', disabled }) {
  const [writing, setWriting] = useState(Boolean(value) && !options.includes(value));
  const choice = writing ? OTHER : value;

  return (
    <>
      <select
        id={id}
        className={inputClass}
        value={choice}
        disabled={disabled}
        onChange={(event) => {
          if (event.target.value === OTHER) {
            setWriting(true);
            onChange('');
          } else {
            setWriting(false);
            onChange(event.target.value);
          }
        }}
      >
        <option value="">Choose a department</option>
        {options.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
        <option value={OTHER}>Other (write it in)…</option>
      </select>
      {writing && (
        <input
          type="text"
          className={inputClass}
          style={{ marginTop: 8 }}
          placeholder="Write the department"
          aria-label="Department name"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </>
  );
}
