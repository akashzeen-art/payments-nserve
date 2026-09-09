import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
});

function HeroVisual() {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[min(78vh,640px)]" aria-hidden="true">
      {/* Soft atmospheric field behind the globe */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] max-w-none">
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18)_0%,rgba(234,88,12,0.1)_42%,transparent_68%)] blur-2xl" />
        <motion.div
          className="absolute inset-[18%] rounded-full border border-sky-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-[26%] rounded-full border border-orange-400/15 border-dashed"
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem]">
          <motion.div
            className="absolute inset-0 rounded-full border border-sky-400/35"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.7)]" />
          </motion.div>
          <motion.div
            className="absolute inset-6 rounded-full border border-orange-400/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute bottom-4 right-6 h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.65)]" />
          </motion.div>

          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-sky-400/25 via-white/10 to-orange-400/20 blur-xl" />

          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-52 h-52 sm:w-56 sm:h-56 lg:w-64 lg:h-64 drop-shadow-[0_20px_50px_rgba(14,165,233,0.18)]">
              <defs>
                <radialGradient id="globeGrad" cx="36%" cy="30%">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#0EA5E9" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0.22" />
                </radialGradient>
                <linearGradient id="globeSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
                  <stop offset="45%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="88" fill="url(#globeGrad)" stroke="#38BDF8" strokeWidth="0.7" />
              <circle cx="100" cy="100" r="88" fill="url(#globeSheen)" />
              {[40, 70, 100, 130, 160].map((y) => (
                <ellipse
                  key={y}
                  cx="100"
                  cy={y}
                  rx={Math.sqrt(Math.max(7744 - (y - 100) ** 2, 0))}
                  ry="9"
                  fill="none"
                  stroke="#BAE6FD"
                  strokeWidth="0.5"
                  strokeOpacity="0.55"
                />
              ))}
              {[0, 36, 72, 108, 144].map((angle) => (
                <ellipse
                  key={angle}
                  cx="100"
                  cy="100"
                  rx="14"
                  ry="88"
                  fill="none"
                  stroke="#BAE6FD"
                  strokeWidth="0.4"
                  strokeOpacity="0.4"
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}
              <circle r="3" fill="#EA580C">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 28,100 Q 100,36 172,100" />
              </circle>
              <circle r="2.6" fill="#0EA5E9">
                <animateMotion dur="5s" repeatCount="indefinite" begin="1s" path="M 172,78 Q 100,150 28,78" />
              </circle>
              <circle r="2.2" fill="#F59E0B">
                <animateMotion dur="6.5s" repeatCount="indefinite" begin="2.2s" path="M 48,140 Q 100,60 152,140" />
              </circle>
            </svg>
          </div>

          <div className="absolute inset-0 rounded-full border border-sky-400/25 animate-pulse-ring" />
          <div
            className="absolute inset-0 rounded-full border border-orange-400/20 animate-pulse-ring"
            style={{ animationDelay: '1.1s' }}
          />
        </div>
      </div>

      {/* Corridor arcs — integrated into the visual plane, not floating badges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 600 480">
        <defs>
          <linearGradient id="routeA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0" />
            <stop offset="45%" stopColor="#EA580C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="routeB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 40,200 Q 300,60 560,180"
          stroke="url(#routeA)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 6"
          className="route-dash"
        />
        <path
          d="M 70,340 Q 300,430 540,250"
          stroke="url(#routeB)"
          strokeWidth="1.25"
          fill="none"
          strokeDasharray="7 5"
          className="route-dash"
          style={{ animationDuration: '3.6s' }}
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden noise-bg"
      aria-label="Hero"
    >
      {/* Full-bleed atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#F8FAFC_0%,#EEF2F7_42%,#F5F7FB_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(234,88,12,0.14),transparent_48%),radial-gradient(ellipse_at_88%_22%,rgba(14,165,233,0.14),transparent_46%),radial-gradient(ellipse_at_70%_88%,rgba(245,158,11,0.08),transparent_40%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.45]" />

      {/* Soft light sweep */}
      <motion.div
        className="absolute -top-24 left-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] blur-2xl pointer-events-none"
        animate={{ opacity: [0.45, 0.75, 0.45], x: [0, 24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pb-20 w-full">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 lg:gap-6 xl:gap-10 items-center">
          <div className="relative z-10 max-w-xl lg:max-w-[34rem] space-y-8">
            <motion.div className="space-y-5" {...fadeUp(0.05)}>
              <div className="flex items-center gap-3.5">
                <img
                  src="/nservelogo.png"
                  alt=""
                  className="h-12 sm:h-14 w-auto object-contain"
                  aria-hidden="true"
                />
                <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  nSERVE
                </p>
              </div>

              <h1 className="font-display text-[2.15rem] sm:text-5xl lg:text-[3.15rem] xl:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-slate-900">
                Connecting People.
                <span className="block">Payments. Processes.</span>
                <span className="block text-gradient mt-1.5">Across Borders.</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md"
              {...fadeUp(0.18)}
            >
              Every payment has a journey. nSERVE connects countries, currencies, and stakeholders
              into one clear process.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
              <a
                href="#map"
                className="inline-flex items-center gap-2 text-slate-700 border border-slate-300/80 bg-white/50 hover:bg-white hover:border-slate-300 px-7 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                View Corridors
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="relative lg:translate-x-4 xl:translate-x-8"
            initial={{ opacity: 0, scale: 0.94, x: 28 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F7FB] via-[#F5F7FB]/80 to-transparent pointer-events-none" />

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-orange-500/80 to-transparent"
          animate={{ scaleY: [0.55, 1, 0.55], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
