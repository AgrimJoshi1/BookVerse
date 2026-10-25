import bcrypt from 'bcryptjs';
import { DEFAULT_CATEGORIES, DEFAULT_SETTINGS, FIRST_ADMIN } from './defaults';
import { formatDate, today } from './engine';

// The "database": one localStorage key per table. If localStorage is blocked
// (private mode, storage full) it quietly falls back to memory for the session.
const PREFIX = 'bookverse:';
const VERSION = '1';
const TABLES = ['students', 'staff', 'books', 'loans', 'history', 'reservations', 'fines', 'activity', 'messages'];

const memory = new Map();

function getItem(key) {
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function setItem(key, text) {
  try {
    window.localStorage.setItem(PREFIX + key, text);
  } catch {
    memory.set(key, text);
  }
}

function removeItem(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    memory.delete(key);
  }
}

export function read(key, fallback) {
  try {
    const text = getItem(key);
    return text === null ? fallback : JSON.parse(text);
  } catch {
    return fallback; // corrupt JSON: treat the table as empty
  }
}

export function write(key, value) {
  setItem(key, JSON.stringify(value));
}

// Everything the rules engine needs, as one plain object.
export function load() {
  const state = {};
  for (const table of TABLES) state[table] = read(table, []);
  // browsers that saved settings before departments existed get the default lists
  state.settings = { ...DEFAULT_SETTINGS, ...read('settings', DEFAULT_SETTINGS) };
  state.categories = read('categories', DEFAULT_CATEGORIES);
  return state;
}

// Writes back only the tables that actually changed.
export function save(next, prev = null) {
  for (const table of TABLES) if (!prev || next[table] !== prev[table]) write(table, next[table]);
  if (!prev || next.settings !== prev.settings) write('settings', next.settings);
}

// Password hashes live apart from the tables, so they never reach the UI.
export const credentials = {
  all: () => read('credentials', {}),
  get: (id) => read('credentials', {})[id],
  set: (id, hash) => write('credentials', { ...read('credentials', {}), [id]: hash }),
  remove: (id) => {
    const { [id]: _gone, ...rest } = read('credentials', {});
    write('credentials', rest);
  },
};

// "Remember me" keeps the session in localStorage; without it the session
// lives in sessionStorage and ends when the tab is closed.
const tabSession = {
  get: () => {
    try {
      return JSON.parse(window.sessionStorage.getItem(PREFIX + 'session'));
    } catch {
      return null;
    }
  },
  set: (session) => {
    try {
      window.sessionStorage.setItem(PREFIX + 'session', JSON.stringify(session));
    } catch {
      memory.set('session', JSON.stringify(session));
    }
  },
  clear: () => {
    try {
      window.sessionStorage.removeItem(PREFIX + 'session');
    } catch {
      /* nothing stored */
    }
  },
};

export const sessionStore = {
  get: () => tabSession.get() ?? read('session', null),
  set: (session, remember) => {
    sessionStore.clear();
    if (remember) write('session', session);
    else tabSession.set(session);
  },
  clear: () => {
    tabSession.clear();
    removeItem('session');
  },
};

// First run: empty tables plus the starter admin. Runs once per browser.
let ready = null;
export function init() {
  if (ready) return ready;
  ready = (async () => {
    if (getItem('version') === VERSION) return;
    for (const table of TABLES) write(table, []);
    write('settings', DEFAULT_SETTINGS);
    write('categories', DEFAULT_CATEGORIES);

    const id = `BV${new Date().getFullYear()}ADM001`;
    write('staff', [
      {
        id,
        name: FIRST_ADMIN.name,
        role: 'admin',
        department: FIRST_ADMIN.department,
        email: FIRST_ADMIN.email,
        phone: FIRST_ADMIN.phone,
        addedOn: today(),
        joined: formatDate(today()).slice(3),
        status: 'active',
      },
    ]);
    write('credentials', { [id]: await bcrypt.hash(FIRST_ADMIN.password, 10) });
    setItem('version', VERSION);
  })();
  return ready;
}

// Wipes every bookverse:* key (used by "Reset" and by tests).
export function reset() {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    memory.clear();
  }
  ready = null;
}
