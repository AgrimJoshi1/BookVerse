// A ruled table. Columns are { key, label, num, mono, title, actions, render }.
// Under 760px each row stacks into "label: value" lines (see admin.css), which
// is why every cell carries its label.
export default function LedgerTable({ columns, rows, rowKey, empty }) {
  if (rows.length === 0) {
    return (
      <div className="ledger-empty">
        {empty ?? <strong>Nothing to show.</strong>}
      </div>
    );
  }

  return (
    <div className="ledger-wrap">
      <table className="ledger">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.num ? 'num' : undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  data-label={col.actions ? '' : col.label}
                  className={
                    [
                      col.num && 'num',
                      col.mono && 'mono',
                      col.title && 'cell-title',
                      col.actions && 'cell-actions',
                    ]
                      .filter(Boolean)
                      .join(' ') || undefined
                  }
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
