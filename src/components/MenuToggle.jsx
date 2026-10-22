export default function MenuToggle({ open, onToggle }) {
  return (
    <button className="menu-toggle" aria-label="Open menu" aria-expanded={open} onClick={onToggle}>
      <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
    </button>
  );
}
