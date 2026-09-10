import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const VIDEO_SRC =
  'https://vz-7fee017a-811.b-cdn.net/9bd4283a-d69a-4d09-bf95-e7dc02e2541d/play_480p.mp4';

const ease = [0.22, 1, 0.36, 1];

export default function CrossBorderVideo() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const inView = useInView(frameRef, { amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-14%', '14%'],
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduceMotion ? [1, 1, 1] : [1.14, 1.04, 1.12],
  );
  const frameLift = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [36, 0, -28],
  );
  const bgDrift = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['8%', '-8%'],
  );

  const playVideo = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.muted = muted;
      await el.play();
      setPlaying(true);
    } catch {
      try {
        el.muted = true;
        setMuted(true);
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }, [muted]);

  const pauseVideo = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  }, []);

  useEffect(() => {
    const coarse =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (hovering || (coarse && inView)) {
      playVideo();
    } else if (!coarse) {
      pauseVideo();
    } else if (!inView) {
      pauseVideo();
    }
  }, [hovering, inView, playVideo, pauseVideo]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    const onTime = () => {
      if (!el.duration) return;
      setProgress(el.currentTime / el.duration);
    };
    el.addEventListener('timeupdate', onTime);
    return () => el.removeEventListener('timeupdate', onTime);
  }, [ready]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  const togglePlayTap = () => {
    const coarse =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (!coarse) return;
    if (playing) pauseVideo();
    else playVideo();
  };

  return (
    <section
      id="cross-border-video"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden scroll-mt-20"
      aria-label="What is cross-border payments"
    >
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <motion.div
        className="absolute inset-0 opacity-90"
        style={{
          y: bgDrift,
          backgroundImage:
            'radial-gradient(ellipse at 30% 20%, rgba(14,165,233,0.16), transparent 50%), radial-gradient(ellipse at 78% 70%, rgba(234,88,12,0.14), transparent 48%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <motion.p
            className="text-orange-600 text-sm font-semibold tracking-[0.18em] uppercase mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            Cross-border payments
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06, ease }}
          >
            What is cross-border payments?
          </motion.h2>
          <motion.p
            className="text-slate-600 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease }}
          >
            
          </motion.p>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          style={{ y: frameLift }}
        >
          <div
            className="absolute -inset-3 sm:-inset-5 rounded-[2rem] bg-gradient-to-br from-orange-500/15 via-sky-400/10 to-transparent blur-xl"
            aria-hidden="true"
          />

          <div
            ref={frameRef}
            role="region"
            aria-label="Cross-border payments video player"
            className="group relative rounded-2xl sm:rounded-[1.75rem] overflow-hidden border border-slate-200/90 bg-slate-950 shadow-[0_40px_100px_-36px_rgba(15,23,42,0.55)] cursor-pointer"
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onClick={togglePlayTap}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <motion.div
                className="absolute inset-[-10%] will-change-transform"
                style={{ y: scrollY, scale: scrollScale }}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  muted={muted}
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={() => setReady(true)}
                  aria-label="Cross-border payments overview video"
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                </video>
              </motion.div>

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/25"
                aria-hidden="true"
              />

              <AnimatePresence>
                {!playing && (
                  <motion.div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="relative flex h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 items-center justify-center rounded-full bg-orange-600 text-white shadow-[0_18px_40px_rgba(234,88,12,0.45)] ring-4 ring-white/20"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: [1, 1.06, 1],
                              boxShadow: [
                                '0 18px 40px rgba(234,88,12,0.35)',
                                '0 18px 52px rgba(234,88,12,0.55)',
                                '0 18px 40px rgba(234,88,12,0.35)',
                              ],
                            }
                      }
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Play size={28} className="ml-1" fill="currentColor" />
                    </motion.span>
                    {!ready && (
                      <p className="text-white/80 text-sm font-medium">Loading…</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 transition-opacity duration-300 ${
                  playing ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (playing) pauseVideo();
                      else playVideo();
                    }}
                    className="h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors"
                    aria-label={playing ? 'Pause video' : 'Play video'}
                  >
                    {playing ? (
                      <Pause size={16} fill="currentColor" />
                    ) : (
                      <Play size={16} className="ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-orange-500 transition-[width] duration-150 ease-linear"
                      style={{ width: `${Math.max(progress * 100, 1)}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors"
                    aria-label={muted ? 'Unmute video' : 'Mute video'}
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
