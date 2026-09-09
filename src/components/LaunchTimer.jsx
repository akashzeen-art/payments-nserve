import { useEffect, useState } from "react";

const LAUNCH_MS = 22 * 60 * 60 * 1000;
const STORAGE_KEY = "nserve-launch-at";

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

function pad(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getRemaining(launchAt) {
  const remaining = Math.max(0, launchAt - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    hours: pad(Math.floor(totalSeconds / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

export default function LaunchTimer() {
  const [launchAt] = useState(() => getLaunchAt());
  const [time, setTime] = useState(() => getRemaining(launchAt));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(getRemaining(launchAt));
    }, 1000);
    return () => window.clearInterval(id);
  }, [launchAt]);

  return (
    <div className="launch">
      <p className="launch__label">Launching in</p>
      <h1 className="timer" aria-live="polite">
        <span className="timer__block">
          <span className="timer__value">{time.hours}</span>
          <span className="timer__unit">hours</span>
        </span>
        <span className="timer__sep" aria-hidden="true">
          :
        </span>
        <span className="timer__block">
          <span className="timer__value">{time.minutes}</span>
          <span className="timer__unit">min</span>
        </span>
        <span className="timer__sep" aria-hidden="true">
          :
        </span>
        <span className="timer__block">
          <span className="timer__value">{time.seconds}</span>
          <span className="timer__unit">sec</span>
        </span>
      </h1>
    </div>
  );
}
