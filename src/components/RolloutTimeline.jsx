import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    id: 'phase-1',
    label: 'Phase 01',
    title: 'Foundation',
    date: 'Q1',
    desc: 'Corridor mapping, stakeholder model and compliance framework locked in.',
    color: '#7856AF',
  },
  {
    id: 'phase-2',
    label: 'Phase 02',
    title: 'Africa Liquidity',
    date: 'Q2',
    desc: 'Liquidity rails activated across priority African markets for inward and outward payments.',
    color: '#9EC400',
  },
  {
    id: 'phase-3',
    label: 'Phase 03',
    title: 'Platform Live',
    date: 'Q3',
    desc: 'Digital due diligence, account activation and trade execution open to partners.',
    color: '#32AFEA',
  },
  {
    id: 'phase-4',
    label: 'Phase 04',
    title: 'Scale',
    date: 'Q4',
    desc: 'Expanded currency coverage, partner onboarding and end-to-end journey orchestration.',
    color: '#C74F4F',
  },
  {
    id: 'phase-5',
    label: 'Phase 05',
    title: 'Global Reach',
    date: 'Next',
    desc: 'Additional corridors on request — exotic and illiquid markets included.',
    color: '#EA580C',
  },
];

const ease = [0.22, 1, 0.36, 1];

function PhaseCard({ item, index, side }) {
  const isLeft = side === 'left';

  return (
    <motion.article
      className={`relative w-full max-w-md ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
      initial={{ opacity: 0, x: isLeft ? -56 : 56, y: 28 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.65, delay: 0.08, ease }}
    >
      {/* Connector to center spine (desktop) */}
      <span
        className={`hidden md:block absolute top-10 h-px w-12 ${
          isLeft ? 'right-0' : 'left-0'
        }`}
        style={{ background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, transparent, ${item.color})` }}
        aria-hidden="true"
      />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-sm p-5 sm:p-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]"
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-4">
          <motion.span
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white font-display text-sm font-bold"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 10px 28px ${item.color}66`,
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2, ease }}
          >
            <span
              className="absolute inset-0 rounded-full rollout-pulse-ring"
              style={{ backgroundColor: item.color, animationDelay: `${index * 0.4}s` }}
              aria-hidden="true"
            />
            <span className="relative z-10">{item.date}</span>
          </motion.span>

          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/90 mb-1">
              {item.label}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-sky-100/85 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function RolloutTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="rollout"
      ref={ref}
      className="relative overflow-hidden scroll-mt-20 py-20 lg:py-28"
      aria-label="nSERVE rollout timeline"
    >
      <div className="absolute inset-0 bg-[#053c50]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 20%, rgba(50,175,234,0.35), transparent 45%), radial-gradient(ellipse at 80% 80%, rgba(158,196,0,0.2), transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 max-w-xl">
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            The rollout timeline
          </motion.h2>
          <motion.p
            className="text-sky-200/90 text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25, ease }}
          >
            Dates to know — how nSERVE scales from foundation to global corridors.
          </motion.p>
        </div>

        <div className="relative">
          {/* Center spine */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-sky-300/80 via-white/40 to-orange-400/70"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.4, ease }}
            />
          </div>

          <ol className="relative space-y-8 sm:space-y-10 md:space-y-12">
            {milestones.map((item, index) => {
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-0">
                  {/* Center node */}
                  <motion.span
                    className="absolute left-7 md:left-1/2 top-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, delay: 0.12, ease }}
                    aria-hidden="true"
                  >
                    <span
                      className="absolute h-4 w-4 rounded-full"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 0 6px ${item.color}33` }}
                    />
                  </motion.span>

                  {/* Spacer for alternating layout */}
                  {side === 'right' && <div className="hidden md:block" />}

                  <div className={`${side === 'left' ? 'md:col-start-1' : 'md:col-start-2'} pl-14 md:pl-0`}>
                    <PhaseCard item={item} index={index} side={side} />
                  </div>

                  {side === 'left' && <div className="hidden md:block" />}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
