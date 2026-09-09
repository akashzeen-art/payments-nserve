import { useEffect, useMemo, useRef } from "react";

const BG_IMAGE =
  "https://drive.google.com/thumbnail?id=1_ZMV_LcmUXLsRokuz6WXGyN9zVCGfAHp&sz=w1920";
const BOY_IMAGE =
  "https://drive.google.com/thumbnail?id=1eGqJskQQgBJ67myGekmo4YfIVI3lfDTm&sz=w1920";

function Cube() {
  const marqueeHtml = useMemo(() => {
    const line =
      'Revealing <span>New</span> Payments Solutions, <span>Everyday!</span>';
    return `<p>${Array(48).fill(line).join("     ·     ")}</p>`;
  }, []);

  return (
    <div className="cube">
      <div className="face top" />
      <div className="face bottom" />
      <div
        className="face left text"
        dangerouslySetInnerHTML={{ __html: marqueeHtml }}
      />
      <div
        className="face right text"
        dangerouslySetInnerHTML={{ __html: marqueeHtml }}
      />
      <div className="face front" />
      <div
        className="face back text"
        dangerouslySetInnerHTML={{ __html: marqueeHtml }}
      />
    </div>
  );
}

export default function CosmicScene() {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const adjustSceneSize = () => {
      const baseWidth = 1000;
      const baseHeight = 562;
      const scale =
        Math.max(window.innerWidth / baseWidth, window.innerHeight / baseHeight) *
        1.05;
      frame.style.transform = `scale(${scale})`;
    };

    adjustSceneSize();
    window.addEventListener("resize", adjustSceneSize);
    return () => window.removeEventListener("resize", adjustSceneSize);
  }, []);

  return (
    <div className="scene" aria-hidden="true">
      <div className="scene__frame" ref={frameRef}>
        <div className="container-full">
          <div className="animated hue" />
          <img className="backgroundImage" src={BG_IMAGE} alt="" />
          <img className="boyImage" src={BOY_IMAGE} alt="" />
          <div className="cube-wrap">
            <Cube />
          </div>
          <div className="container-reflect">
            <Cube />
          </div>
        </div>
      </div>
      <div className="scene__veil" />
    </div>
  );
}
