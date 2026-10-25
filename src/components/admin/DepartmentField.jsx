import DepartmentSelect from '../DepartmentSelect';

// The admin shell's labelled Department dropdown (with the "Other" write-in).
export default function DepartmentField({ id, label = 'Department', options, value, onChange, error }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <DepartmentSelect id={id} inputClass="ad-select" options={options} value={value} onChange={onChange} />
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
