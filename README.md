# BookVerse

Library management app (public site, student, librarian and admin areas) built with React, React Router and Vite. The "backend" is plain JavaScript on top of localStorage, with Promises.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

**First login:** pick **Admin** on the login page and use `admin@bookverse.edu` / `Admin@123` (change it from Profile). The admin then adds books, members and librarians. Students register themselves on the Register page and an admin approves them under Members.

**Passwords** must have 8+ characters with an uppercase letter, a lowercase letter, a number and a symbol; a live checklist shows under every password field. When an admin adds an account or resets a password, they set a temporary one and the person must choose their own (`/set-password`) the first time they log in.

**Departments:** students pick a department and year (the lists are edited in Admin → Settings, and "Other" lets them write one in). Librarians and admins have a staff department.

**Forgot password:** the link on Login opens `/forgot-password`. The request lands in Admin → Inbox (Reset requests tab) with the matching account, and the admin resets it with a temporary password.

**Book details:** Browse Books cards (students) and the Books list (librarians) open a details page with the cover (Open Library by ISBN, coloured placeholder when offline), availability and similar books. Librarians also see who has each copy and the hold queue. Unknown URLs show a 404 page.

**Captcha:** Login, Register, Forgot password and the Contact form ask for a picture captcha (`src/api/captcha.js` draws it and keeps the answer in memory, single use, expires after 5 minutes). Pages behind a login don't need one.

**Contact form:** messages sent from the public Contact page land in Admin → Inbox (unread badge in the top bar).

## Layout

```
public/assets/        images and background video
src/App.jsx           route table (pages are lazy-loaded, role areas are guarded)
src/api/              the "backend": engine.js (rules), db.js (localStorage), index.js (promise-based API)
src/context/          LibraryContext: React client of the API (hooks and actions)
src/layouts/          PublicLayout, and Student/Librarian/AdminLayout
src/components/       navbars, footers, burger menu, PageStyles, RequireRole, admin/ widgets
src/pages/<area>/     one component per page
src/styles/           one stylesheet per page, plus student-common / librarian-common / admin
src/utils/            csv export
```

Each page's stylesheet is rendered through `<PageStyles>` so it only applies while that page is mounted. Several of the stylesheets redefine the same selectors (`.container`, `.navbar`, `body`), so they can't all be loaded at once.

## How the backend works

There is no server. `src/api` plays that role:

- **localStorage is the database.** One key per table (`bookverse:books`, `bookverse:students`, `bookverse:loans`, ...), written by `db.js`. Open DevTools > Application > Local Storage to see them. Clear the site data to start from scratch.
- **Every API call returns a Promise** that settles after about 300 ms (`request()` in `index.js`), like a network round trip, and rejects with an `ApiError` that carries field messages. Pages `await` the calls and show a busy state or the errors. A thin progress bar shows at the top while anything is in flight.
- **Passwords are hashed with bcrypt** (`bcryptjs`, async) and kept apart from the tables. The session lives in `bookverse:session`.
- **Roles are enforced in the API** (`requireRole`) and in the router (`RequireRole`). The role card chosen on the login page must match the account.
- **The rules** (borrowing limits, fines, grace days, the reservation queue) live in `engine.js` as pure functions, shared by the API and by the UI previews. Dates use the real current date.
- **Accounts:** students sign up and wait for approval; librarians and admins are created by an admin, who sets a temporary password.
