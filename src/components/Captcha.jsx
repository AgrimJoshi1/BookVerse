import { useCallback, useEffect, useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import PageStyles from './PageStyles';

const CSS = `
.captcha { margin: 12px 0; }
.captcha-row { display: flex; align-items: stretch; gap: 8px; flex-wrap: wrap; }
.captcha-image { height: 56px; width: 180px; max-width: 100%; border: 1px solid rgba(120,100,80,.35); border-radius: 8px; background: #f4efe7; display: block; }
.captcha-image.loading { opacity: .5; }
.captcha-new { width: 40px; border: 1px solid rgba(120,100,80,.35); border-radius: 8px; background: rgba(255,255,255,.08); color: inherit; cursor: pointer; font-size: 16px; }
.captcha-new:hover { border-color: currentColor; }
.captcha-input { margin-top: 8px; width: 100%; min-height: 38px; padding: 8px 11px; border: 1px solid #d5d9dc; border-radius: 8px; background: rgba(252,252,252,.85); color: #2a1d14; font: inherit; font-size: .9rem; letter-spacing: .2em; text-transform: uppercase; box-sizing: border-box; }
.captcha-input:focus { outline: none; border-color: #9b795c; box-shadow: 0 0 0 3px rgba(155,121,92,.15); }
.captcha-label { display: block; margin-bottom: 6px; font-size: .66rem; font-weight: 600; letter-spacing: .08em; opacity: .85; }
.captcha-error { margin: 6px 0 0; color: #c0583a; font-size: .85rem; }
`;

// A picture of 5 characters to type back. The server (src/api/captcha.js) owns
// the answer; this only shows the picture and collects what was typed.
// Bump `refreshKey` after a failed submit: a challenge can only be tried once.
export default function Captcha({ value, onChange, onChallenge, error, refreshKey = 0 }) {
  const { newCaptcha } = useLibrary();
  const [challenge, setChallenge] = useState(null);

  const load = useCallback(() => {
    const next = newCaptcha();
    setChallenge(next);
    onChallenge(next.id);
  }, [newCaptcha, onChallenge]);

  useEffect(() => {
    load();
  }, [refreshKey]);

  return (
    <div className="captcha">
      <PageStyles css={CSS} />
      <label className="captcha-label" htmlFor="captcha">
        TYPE THE CHARACTERS YOU SEE
      </label>
      <div className="captcha-row">
        {challenge ? (
          <img
            className="captcha-image"
            src={challenge.image}
            data-id={challenge.id}
            alt="Captcha: type the 5 characters shown"
          />
        ) : (
          <div className="captcha-image loading" />
        )}
        <button
          type="button"
          className="captcha-new"
          aria-label="Get a new captcha"
          onClick={() => {
            onChange('');
            load();
          }}
        >
          <i className="fa-solid fa-rotate-right" />
        </button>
      </div>
      <input
        id="captcha"
        className="captcha-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={5}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        aria-invalid={error ? 'true' : undefined}
        placeholder="Enter the code"
      />
      {error && (
        <p className="captcha-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
