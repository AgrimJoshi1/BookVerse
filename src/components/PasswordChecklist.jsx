import PageStyles from './PageStyles';
import { PASSWORD_RULES } from '../api/engine';

// Uses currentColor so it fits both the light pages and the dark admin shell.
const css = `
.pw-rules{list-style:none;margin:6px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:2px 12px;font-size:12px;line-height:1.5;text-align:left}
.pw-rules li{display:flex;align-items:center;gap:6px;opacity:.6}
.pw-rules li::before{content:'';flex:none;width:8px;height:8px;border-radius:50%;border:1.5px solid currentColor}
.pw-rules li.met{opacity:1}
.pw-rules li.met::before{background:currentColor}
`;

// Lists each password rule and ticks it off as the typed password meets it.
export default function PasswordChecklist({ value = '' }) {
  return (
    <>
      <PageStyles css={css} />
      <ul className="pw-rules" aria-label="Password requirements">
        {PASSWORD_RULES.map((rule) => (
          <li key={rule.label} className={rule.test(value) ? 'met' : ''}>
            {rule.label}
          </li>
        ))}
      </ul>
    </>
  );
}
