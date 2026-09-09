import { useEffect, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import CosmicScene from "./components/CosmicScene.jsx";
import ComingSoon from "./components/ComingSoon.jsx";

const PRELOADER_MS = 4200;

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.classList.add("is-loading");

    const finish = () => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
      setPreloaderDone(true);
    };

    if (reduceMotion) {
      finish();
      return undefined;
    }

    const timer = window.setTimeout(finish, PRELOADER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader done={preloaderDone} />
      <CosmicScene />
      <ComingSoon />
    </>
  );
}
