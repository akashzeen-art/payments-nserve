import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
});

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
            className="relative lg:translate-x-2 xl:translate-x-4"
            initial={{ opacity: 0, scale: 0.96, x: 28 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            <div className="relative w-full">
              <div
                className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.16)_0%,rgba(234,88,12,0.08)_45%,transparent_70%)] blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <img
                src="/hero.png"
                alt="nSERVE cross-border payments — client, escrow, and coordination journey"
                className="relative w-full h-auto max-h-[min(72vh,560px)] object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.12)]"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F7FB] via-[#F5F7FB]/80 to-transparent pointer-events-none" />

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
