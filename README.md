# BookVerse

Library management UI (public site, student, teacher and admin areas) built with React, React Router and Vite.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Demo logins (the login page prefills these when you pick a role): `student@demo`, `teacher@demo`, `admin@demo`.

## Layout

```
public/assets/        images and background video
src/App.jsx           route table (pages are lazy-loaded)
src/layouts/          PublicLayout, and Student/Teacher/AdminLayout on top of RoleLayout
src/components/       navbars, footers, burger menu, PageStyles
src/pages/<area>/     one component per page
src/styles/           one stylesheet per page, plus teacher-common / admin-common
```

Each page's stylesheet is rendered through `<PageStyles>` so it only applies while that page is mounted. Several of the stylesheets redefine the same selectors (`.container`, `.navbar`, `body`), so they can't all be loaded at once.
