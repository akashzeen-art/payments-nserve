import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftRight,
  ClipboardList,
  Route,
  ShieldCheck,
  Users,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const platforms = [
  {
    id: '01',
    label: 'nSERVE',
    title: 'Technology-enabler repatriation services',
    sub: 'One Process. Multiple Currencies. Seamless Coordination',
    points: [
      'nSERVE brings stakeholders together through a structured and transparent workflow',
      'Every stage of the process managed efficiently',
      'Coordination across authorities, consulates, logistics partners, pharmaceuticals, financial institutions and other service providers',
    ],
    icon: Users,
    accent: '#1D4ED8',
    gradient: 'linear-gradient(145deg, #0f172a 0%, #1e3a8a 48%, #1d4ed8 100%)',
  },
  {
    id: '02',
    label: 'Currency',
    title: 'Liquidity across the world',
    sub: 'nSERVE provides currency liquidity across most African markets — and selected corridors worldwide — for both inward and outward payments. Our objective is simple: move cross-border value securely, with speed, clarity and fewer intermediaries.',
    points: [
      'Non-convertible currencies requiring significant amounts of blueprints to export',
      'High cost of conversion',
      'Lengthy turnaround time reducing your working capital and treasury pools',
      'Multiple service providers you have to deal with',
    ],
    pointsLabel: 'Problems to solve',
    solutionLabel: 'Proposed solution',
    solution:
      'Deep liquidity, broad currency coverage and a 24-48 hour operating model — purpose-built for restricted, exotic and high-friction corridors where conventional banking falls short.',
    stats: [
      {
        value: '50+',
        label: 'Currencies',
        desc: 'Major, exotic and illiquid markets managed seamlessly.',
      },
      {
        value: '24–48 H',
        label: 'Turnaround',
        desc: 'Inward and outward cross-border payments executed fast.',
      },
      {
        value: 'Worldwide',
        label: 'Coverage',
        desc: 'Deep liquidity across African markets and beyond.',
      },
    ],
    icon: ArrowLeftRight,
    accent: '#EA580C',
    gradient: 'linear-gradient(145deg, #7c2d12 0%, #c2410c 48%, #ea580c 100%)',
  },
  {
    id: '03',
    label: 'Compliance',
    title: 'Compliance & Control',
    tagline: 'Secure information. Clear accountability. Regulation-ready workflows.',
    sub: 'Cross-border movement without compromising trust, documentation or oversight. Every cross-border payment carries regulatory, documentation and information-risk requirements. nSERVE embeds compliance into the journey — so teams can move faster without losing control of sensitive data, approvals or auditability.',
    points: [],
    enablesLabel: 'What this enables',
    enables: [
      {
        title: 'Secure by design',
        desc: 'Sensitive documents, identities and transaction data protected at every handoff.',
      },
      {
        title: 'Regulation-ready',
        desc: 'Built for cross-border compliance expectations across key markets.',
      },
      {
        title: 'Transparency',
        desc: 'Every approval, update and settlement event logged for review.',
      },
      {
        title: 'Risk visibility',
        desc: 'Clear exception handling so compliance teams stay informed without slowing the journey.',
      },
    ],
    flowLabel: 'Compliance flow',
    flow: [
      { id: '01', label: 'Verify' },
      { id: '02', label: 'Screen' },
      { id: '03', label: 'Approve' },
      { id: '04', label: 'Monitor' },
    ],
    icon: ShieldCheck,
    accent: '#0EA5E9',
    gradient: 'linear-gradient(145deg, #0c4a6e 0%, #0369a1 48%, #0ea5e9 100%)',
  },
  {
    id: '04',
    label: 'Journey',
    title: 'End-to-End Journey',
    tagline: 'Different countries. Different currencies. One connected process.',
    sub: 'Every payment has a journey — nSERVE connects every step. Cross-border success is rarely just about sending funds. It is about orchestrating people, paperwork, partners and payment rails into one dependable journey — with visibility from instruction to confirmation.',
    points: [],
    flowLabel: 'Journey stages',
    flowFirst: true,
    flow: [
      { id: '01', label: 'Instruct' },
      { id: '02', label: 'Coordinate' },
      { id: '03', label: 'Settle' },
      { id: '04', label: 'Communicate' },
    ],
    enablesLabel: 'Why teams choose nSERVE',
    enables: [
      {
        title: 'One connected process',
        desc: 'Replace fragmented providers with a coordinated layer across countries and currencies.',
      },
      {
        title: 'Built for complexity',
        desc: 'Designed for repatriation, currency conversion and restricted corridors — not just easy markets.',
      },
      {
        title: 'Speed with control',
        desc: 'Target rapid execution without sacrificing compliance, documentation or auditability.',
      },
      {
        title: 'Partner-ready',
        desc: 'Structured for enterprises, institutions and operators that need dependable cross-border ops.',
      },
    ],
    icon: Route,
    accent: '#DC2626',
    gradient: 'linear-gradient(145deg, #7f1d1d 0%, #b91c1c 48%, #dc2626 100%)',
  },
];

export default function ParallaxServices() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20 lg:py-24" aria-label="Our platforms">
      <div className="absolute inset-0 bg-[#F5F7FB]" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 15% 8%, rgba(234,88,12,0.08), transparent 40%), radial-gradient(ellipse at 85% 20%, rgba(14,165,233,0.08), transparent 38%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.p
          className="text-orange-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          Explore
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-3 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease }}
        >
          Our platforms
        </motion.h2>
        <motion.p
          className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          Four connected layers — from repatriation coordination to currency liquidity, compliance and
          the full payment journey.
        </motion.p>

        {/* Desktop / tablet expanding panels */}
        <motion.div
          className="hidden md:flex items-stretch gap-3 h-[500px] lg:h-[540px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
          role="list"
          aria-label="Platform layers"
        >
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isActive = active === index;
            const isDense = Boolean(
              platform.solution || platform.stats || platform.enables || platform.flow
            );

            return (
              <button
                key={platform.id}
                type="button"
                role="listitem"
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                className={`group relative overflow-hidden text-center transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                  isActive
                    ? 'flex-[8] rounded-[2rem] m-0'
                    : 'flex-[1] min-w-[4.5rem] rounded-[1.75rem] hover:brightness-110'
                }`}
                style={{ background: platform.gradient }}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500 ${
                    isActive ? 'h-48' : 'h-28'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? 'inset 0 -140px 140px -120px rgba(0,0,0,0.85), inset 0 -120px 120px -100px rgba(0,0,0,0.7)'
                      : 'inset 0 -120px 0 -120px rgba(0,0,0,0.75)',
                  }}
                  aria-hidden="true"
                />

                {/* Collapsed: icon + vertical label */}
                {!isActive && (
                  <>
                    <span className="absolute left-1/2 top-8 -translate-x-1/2 rotate-180 writing-mode-vertical font-display text-xs font-semibold tracking-[0.18em] uppercase text-white/80 [writing-mode:vertical-rl]">
                      {platform.label}
                    </span>
                    <span className="absolute left-1/2 bottom-4 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
                      <Icon size={18} style={{ color: platform.accent }} strokeWidth={2} />
                    </span>
                  </>
                )}

                {/* Expanded: centered content */}
                {isActive && (
                  <div
                    className={`absolute inset-0 z-10 flex flex-col items-center overflow-y-auto ${
                      isDense
                        ? 'justify-start px-5 lg:px-8 py-5'
                        : 'justify-center px-6 lg:px-12 py-7'
                    }`}
                  >
                    <span
                      className={`flex shrink-0 items-center justify-center rounded-full bg-white shadow-lg ${
                        isDense ? 'h-9 w-9 mb-2' : 'h-11 w-11 mb-3'
                      }`}
                    >
                      <Icon
                        size={isDense ? 16 : 18}
                        style={{ color: platform.accent }}
                        strokeWidth={2}
                      />
                    </span>

                    <div className="w-full max-w-2xl mx-auto text-white text-center">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/60 mb-1">
                        {platform.id} · {platform.label}
                      </p>
                      <h3
                        className={`font-display font-bold tracking-tight text-balance leading-snug px-2 ${
                          isDense
                            ? 'text-lg sm:text-xl lg:text-[1.35rem]'
                            : 'text-xl sm:text-2xl lg:text-[1.7rem]'
                        }`}
                      >
                        {platform.title}
                      </h3>
                      {platform.tagline && (
                        <p className="mt-1.5 text-[11px] sm:text-xs font-semibold text-sky-100/95 text-balance max-w-xl mx-auto">
                          {platform.tagline}
                        </p>
                      )}
                      <p
                        className={`text-white/85 leading-snug text-balance max-w-xl mx-auto ${
                          isDense
                            ? 'mt-1.5 text-xs lg:text-[13px]'
                            : 'mt-3 text-sm lg:text-[15px] leading-relaxed'
                        }`}
                      >
                        {platform.sub}
                      </p>
                      {platform.pointsLabel && (
                        <p className="mt-2.5 text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70">
                          {platform.pointsLabel}
                        </p>
                      )}
                      {platform.points?.length > 0 && (
                        <ul
                          className={`max-w-xl mx-auto ${
                            platform.pointsLabel
                              ? 'mt-1.5 space-y-1'
                              : 'mt-5 space-y-2.5'
                          }`}
                        >
                          {platform.points.map((point, pointIndex) => (
                            <li
                              key={point}
                              className={`grid grid-cols-[18px_1fr] gap-x-2 items-start text-left text-white/80 ${
                                isDense ? 'text-[11px] sm:text-xs' : 'text-xs sm:text-sm'
                              }`}
                            >
                              {platform.pointsLabel ? (
                                <span className="mt-0.5 text-[10px] font-bold text-white/90 tabular-nums justify-self-center">
                                  {pointIndex + 1}
                                </span>
                              ) : (
                                <ClipboardList size={14} className="mt-0.5 shrink-0 text-white/90 justify-self-center" />
                              )}
                              <span className="leading-snug whitespace-normal">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {platform.enables?.length > 0 && !platform.flowFirst && (
                        <div className="mt-2.5 max-w-2xl mx-auto">
                          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 mb-1.5">
                            {platform.enablesLabel}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 text-left">
                            {platform.enables.map((item) => (
                              <div
                                key={item.title}
                                className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-2"
                              >
                                <p className="text-[11px] sm:text-xs font-semibold text-white leading-snug">
                                  {item.title}
                                </p>
                                <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/70 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {platform.flow?.length > 0 && (
                        <div className="mt-2.5 max-w-2xl mx-auto">
                          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 mb-1.5">
                            {platform.flowLabel}
                          </p>
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            {platform.flow.map((step, stepIndex) => (
                              <div key={step.id} className="flex items-center gap-1 sm:gap-2">
                                <div className="rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 min-w-[4.5rem] sm:min-w-[5.75rem]">
                                  <p className="text-[9px] font-bold tracking-[0.14em] text-white/70">
                                    {step.id}
                                  </p>
                                  <p className="font-display text-[11px] sm:text-sm font-bold text-white leading-none mt-0.5">
                                    {step.label}
                                  </p>
                                </div>
                                {stepIndex < platform.flow.length - 1 && (
                                  <span className="text-white/40 text-xs" aria-hidden="true">
                                    →
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {platform.enables?.length > 0 && platform.flowFirst && (
                        <div className="mt-2.5 max-w-2xl mx-auto">
                          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 mb-1.5">
                            {platform.enablesLabel}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 text-left">
                            {platform.enables.map((item) => (
                              <div
                                key={item.title}
                                className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-2"
                              >
                                <p className="text-[11px] sm:text-xs font-semibold text-white leading-snug">
                                  {item.title}
                                </p>
                                <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/70 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {platform.solution && (
                        <div className="mt-2.5 max-w-xl mx-auto">
                          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 text-center">
                            {platform.solutionLabel}
                          </p>
                          <p className="mt-1 text-[11px] sm:text-xs text-white/85 leading-snug text-balance text-center">
                            {platform.solution}
                          </p>
                        </div>
                      )}

                      {platform.stats?.length > 0 && (
                        <div className="mt-2.5 grid grid-cols-3 gap-2 max-w-2xl mx-auto">
                          {platform.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-lg border border-white/15 bg-white/10 px-2 py-2 text-center"
                            >
                              <p className="font-display text-base lg:text-lg font-bold text-white tracking-tight leading-none">
                                {stat.value}
                              </p>
                              <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] font-semibold text-orange-200/95">
                                {stat.label}
                              </p>
                              <p className="mt-1 text-[10px] text-white/70 leading-snug hidden lg:block">
                                {stat.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Mobile stacked accordion */}
        <div className="md:hidden space-y-3">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isActive = active === index;
            const isDense = Boolean(
              platform.solution || platform.stats || platform.enables || platform.flow
            );

            return (
              <motion.button
                key={platform.id}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className={`w-full overflow-hidden rounded-2xl text-center transition-all duration-400 ${
                  isActive ? (isDense ? 'min-h-0' : 'min-h-[320px]') : 'min-h-[72px]'
                }`}
                style={{ background: platform.gradient }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06, ease }}
              >
                <div
                  className={`relative flex flex-col h-full items-center ${
                    isDense ? 'p-3.5 justify-start' : 'p-5 justify-center'
                  }`}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)',
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className={`relative z-10 flex flex-col items-center w-full max-w-md mx-auto ${
                      isDense ? 'gap-1.5' : 'gap-3'
                    }`}
                  >
                    <span
                      className={`flex shrink-0 items-center justify-center rounded-full bg-white ${
                        isDense ? 'h-8 w-8' : 'h-10 w-10'
                      }`}
                    >
                      <Icon size={isDense ? 15 : 17} style={{ color: platform.accent }} />
                    </span>
                    <div className="min-w-0 text-white text-center w-full px-1">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">
                        {platform.id} · {platform.label}
                      </p>
                      <p
                        className={`font-display font-bold text-balance leading-snug mt-0.5 ${
                          isDense ? 'text-sm' : 'text-base sm:text-lg'
                        }`}
                      >
                        {platform.title}
                      </p>
                      {isActive && (
                        <>
                          {platform.tagline && (
                            <p className="mt-1 text-[11px] font-semibold text-sky-100/95 text-balance">
                              {platform.tagline}
                            </p>
                          )}
                          <p
                            className={`text-white/80 text-balance ${
                              isDense
                                ? 'mt-1.5 text-xs leading-snug'
                                : 'mt-2.5 text-sm leading-relaxed'
                            }`}
                          >
                            {platform.sub}
                          </p>
                          {platform.pointsLabel && (
                            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70">
                              {platform.pointsLabel}
                            </p>
                          )}
                          {platform.points?.length > 0 && (
                            <ul
                              className={`text-left ${
                                platform.pointsLabel ? 'mt-1 space-y-1' : 'mt-4 space-y-2.5'
                              }`}
                            >
                              {platform.points.map((point, pointIndex) => (
                                <li
                                  key={point}
                                  className="grid grid-cols-[16px_1fr] gap-x-1.5 items-start text-[11px] text-white/80"
                                >
                                  {platform.pointsLabel ? (
                                    <span className="mt-0.5 text-[10px] font-bold text-white/90 tabular-nums justify-self-center">
                                      {pointIndex + 1}
                                    </span>
                                  ) : (
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/80 justify-self-center" />
                                  )}
                                  <span className="leading-snug">{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {platform.enables?.length > 0 && !platform.flowFirst && (
                            <div className="mt-2 text-left">
                              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 text-center mb-1.5">
                                {platform.enablesLabel}
                              </p>
                              <div className="grid grid-cols-1 gap-1.5">
                                {platform.enables.map((item) => (
                                  <div
                                    key={item.title}
                                    className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-2"
                                  >
                                    <p className="text-[11px] font-semibold text-white">{item.title}</p>
                                    <p className="mt-0.5 text-[10px] text-white/70 leading-snug">{item.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {platform.flow?.length > 0 && (
                            <div className="mt-2">
                              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 mb-1.5">
                                {platform.flowLabel}
                              </p>
                              <div className="grid grid-cols-4 gap-1">
                                {platform.flow.map((step) => (
                                  <div
                                    key={step.id}
                                    className="rounded-lg border border-white/20 bg-white/10 px-1 py-1.5"
                                  >
                                    <p className="text-[8px] font-bold tracking-wide text-white/70">{step.id}</p>
                                    <p className="font-display text-[10px] font-bold text-white leading-none mt-0.5">
                                      {step.label}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {platform.enables?.length > 0 && platform.flowFirst && (
                            <div className="mt-2 text-left">
                              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70 text-center mb-1.5">
                                {platform.enablesLabel}
                              </p>
                              <div className="grid grid-cols-1 gap-1.5">
                                {platform.enables.map((item) => (
                                  <div
                                    key={item.title}
                                    className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-2"
                                  >
                                    <p className="text-[11px] font-semibold text-white">{item.title}</p>
                                    <p className="mt-0.5 text-[10px] text-white/70 leading-snug">{item.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {platform.solution && (
                            <div className="mt-2">
                              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/70">
                                {platform.solutionLabel}
                              </p>
                              <p className="mt-1 text-[11px] text-white/85 leading-snug text-balance">
                                {platform.solution}
                              </p>
                            </div>
                          )}

                          {platform.stats?.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-1.5">
                              {platform.stats.map((stat) => (
                                <div
                                  key={stat.label}
                                  className="rounded-lg border border-white/15 bg-white/10 px-1.5 py-1.5 text-center"
                                >
                                  <p className="font-display text-sm font-bold text-white leading-none">{stat.value}</p>
                                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.1em] font-semibold text-orange-200/95">
                                    {stat.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
