// Serif title, a muted line of facts under it, actions on the right, then a rule.
export default function PageHeader({ title, meta, children }) {
  return (
    <header className="ad-head">
      <div>
        <h1>{title}</h1>
        {meta && <p className="ad-meta">{meta}</p>}
      </div>
      {children && <div className="ad-actions">{children}</div>}
    </header>
  );
}
