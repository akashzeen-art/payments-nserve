(() => {
  const LAUNCH_MS = 22 * 60 * 60 * 1000;
  const STORAGE_KEY = "nserve-launch-at";
  const PRELOADER_MS = 4200;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ——— Preloader ——— */
  const preloader = document.getElementById("preloader");

  function finishPreloader() {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    preloader.classList.add("is-done");
    preloader.setAttribute("aria-hidden", "true");
  }

  if (reduceMotion) {
    finishPreloader();
  } else {
    window.setTimeout(finishPreloader, PRELOADER_MS);
  }

  /* ——— Launch countdown ——— */
  function getLaunchAt() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = Number(saved);
      if (!Number.isNaN(parsed) && parsed > Date.now()) return parsed;
    }
    const launchAt = Date.now() + LAUNCH_MS;
    localStorage.setItem(STORAGE_KEY, String(launchAt));
    return launchAt;
  }

  const launchAt = getLaunchAt();
  const hoursEl = document.querySelector('[data-unit="hours"]');
  const minutesEl = document.querySelector('[data-unit="minutes"]');
  const secondsEl = document.querySelector('[data-unit="seconds"]');

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function tick() {
    const remaining = Math.max(0, launchAt - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);

  /* ——— Notify form ——— */
  const form = document.getElementById("notify-form");
  const note = document.getElementById("form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");
    if (!email || !String(email).includes("@")) return;

    form.hidden = true;
    note.hidden = false;
  });

  /* ——— 3D marquee copy ——— */
  const line =
    'Revealing <span>New</span> Payments Solutions, <span>Everyday!</span>';
  const marqueeCopy = `<p>${Array(48).fill(line).join("     ·     ")}</p>`;

  document.querySelectorAll(".text").forEach((div) => {
    div.innerHTML = marqueeCopy;
  });

  /* ——— Scale cinematic frame to viewport ——— */
  const frame = document.getElementById("scene-frame");

  function adjustSceneSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const baseWidth = 1000;
    const baseHeight = 562;
    const scale = Math.max(viewportWidth / baseWidth, viewportHeight / baseHeight) * 1.05;
    frame.style.transform = `scale(${scale})`;
  }

  window.addEventListener("load", adjustSceneSize);
  window.addEventListener("resize", adjustSceneSize);
  adjustSceneSize();
})();
