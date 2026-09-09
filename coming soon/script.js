// Launch target: 30 days from first visit (stored locally), fallback fixed date
const STORAGE_KEY = 'nserve-coming-soon-target';

function getTargetDate() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return new Date(saved);

  const target = new Date();
  target.setDate(target.getDate() + 30);
  target.setHours(10, 0, 0, 0);
  localStorage.setItem(STORAGE_KEY, target.toISOString());
  return target;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function tick() {
  const now = new Date();
  const target = getTargetDate();
  let diff = target - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);

const form = document.getElementById('notify-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = new FormData(form).get('email');
  note.textContent = `Thanks — we'll notify ${email} when nSERVE goes live.`;
  form.reset();
});
