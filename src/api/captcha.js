// The captcha half of the fake server. A challenge is a picture of 5 characters;
// the answer stays in this module's memory (never in localStorage or the page),
// can be tried once, and expires after a few minutes.

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O or 1/I/L look-alikes
const LENGTH = 5;
const LIFETIME = 5 * 60 * 1000;
const challenges = new Map();

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

function draw(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 180;
  canvas.height = 56;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f4efe7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const colours = ['#3b2a1e', '#5a3a28', '#2f4a5a', '#6a2f2f', '#34503a'];
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = pick(colours);
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = rand(1, 2);
    ctx.beginPath();
    ctx.moveTo(rand(0, 40), rand(0, 56));
    ctx.bezierCurveTo(rand(40, 90), rand(0, 56), rand(90, 140), rand(0, 56), rand(140, 180), rand(0, 56));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const step = canvas.width / (text.length + 1);
  [...text].forEach((char, i) => {
    ctx.save();
    ctx.translate(step * (i + 1) + rand(-4, 4), 30 + rand(-5, 5) + Math.sin(i * 1.4) * 4);
    ctx.rotate(rand(-0.42, 0.42));
    ctx.fillStyle = pick(colours);
    ctx.font = `bold ${Math.round(rand(26, 34))}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });

  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = pick(colours);
    ctx.globalAlpha = 0.5;
    ctx.fillRect(rand(0, 180), rand(0, 56), 2, 2);
  }
  ctx.globalAlpha = 1;
  return canvas.toDataURL('image/png');
}

export function createCaptcha() {
  const now = Date.now();
  for (const [key, c] of challenges) if (c.expiresAt < now) challenges.delete(key);
  const answer = Array.from({ length: LENGTH }, () => pick([...ALPHABET])).join('');
  const id = `cap-${now}-${Math.floor(Math.random() * 1e6)}`;
  challenges.set(id, { answer, expiresAt: now + LIFETIME });
  return { id, image: draw(answer) };
}

// Returns '' when the answer is right, otherwise what to tell the person.
// Every challenge can be tried once, right or wrong.
export function captchaProblem(captcha) {
  const found = captcha?.id ? challenges.get(captcha.id) : null;
  if (captcha?.id) challenges.delete(captcha.id);
  if (!found || found.expiresAt < Date.now()) return 'That captcha expired. Try the new one.';
  if (String(captcha.answer ?? '').trim().toUpperCase() !== found.answer) {
    return 'The characters did not match. Try the new one.';
  }
  return '';
}

// Test seam so the browser tests can solve a challenge. Dev builds only.
export const peekCaptcha = import.meta.env.DEV ? (id) => challenges.get(id)?.answer : undefined;
