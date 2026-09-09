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

  function tick() {
    const remaining = Math.max(0, launchAt - Date.now());
    const hours = Math.max(1, Math.ceil(remaining / (1000 * 60 * 60)));
    hoursEl.textContent = String(hours);
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
  const marqueeCopy = `<p>If you can <span>send</span> across borders when others still wait;
If you can <span>clear</span> payments when markets lose faith;
If you can <span>trust</span> the rails when all systems doubt you,
But make <span>room</span> for every currency too;
If you can <span>settle</span> and not be tired by settling,
Or, being delayed, still deliver on <span>time</span>;
If you can <span>scale</span>—and not make scale your master;
If you can <span>build</span>—and not make tools your aim;
If you can meet with <span>volume</span> and <span>velocity</span>
And treat those two partners just the same;
If you can bear to hear the <span>truth</span> of fees
<span>Twisted</span> by middlemen to trap the small,
Or watch old banking broken,
And <span>rebuild</span> it better for us all;
Then yours is the <span>world</span> of money in motion—
And more—you'll move it with <span>Payments. Nserve</span>.</p>`;

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
