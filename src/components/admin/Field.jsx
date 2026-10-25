// A labelled input, select or textarea with its hint and error underneath.
// `as` picks the control; everything else is passed through to it.
export default function Field({ id, label, error, hint, as = 'input', className = '', children, ...props }) {
  const Control = as;
  const control = `ad-${as === 'input' ? 'input' : as}`;
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <Control
        id={id}
        className={control}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </Control>
      {error ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="field-hint">{hint}</p>
      )}
    </div>
  );
}
