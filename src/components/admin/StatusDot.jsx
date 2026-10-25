// Status as a small coloured dot and a word: tone is good, bad, warn or neutral.
export default function StatusDot({ tone = 'neutral', children }) {
  return <span className={`dot ${tone}`}>{children}</span>;
}
