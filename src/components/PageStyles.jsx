// Each page ships its own stylesheet and several of them redefine the same
// selectors (.container, .navbar, body, ...). Rendering the CSS as a <style>
// element ties it to the page's lifetime, so it is removed on navigation
// instead of leaking into the next route.
export default function PageStyles({ css }) {
  return <style>{css}</style>;
}
