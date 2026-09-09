import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Users,
  Landmark,
  Plane,
  Hospital,
  ShieldCheck,
  Building2,
  Headphones,
  Scale,
  Shield,
  Eye,
  Network,
  Settings,
  BadgeCheck,
  CheckCircle2,
  FileWarning,
  BadgeDollarSign,
  Clock3,
  Layers,
  Zap,
  Globe2,
  UserCheck,
  Wallet,
  ArrowLeftRight,
  FileCheck2,
  Lock,
  ClipboardList,
  ScanSearch,
  Workflow,
  MapPinned,
  MessageSquare,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const stakeholders = [
  { label: 'Families', icon: Users },
  { label: 'Embassies & Consulates', icon: Landmark },
  { label: 'Airlines & Logistics', icon: Plane },
  { label: 'Hospitals', icon: Hospital },
  { label: 'Insurers', icon: ShieldCheck },
  { label: 'Financial Institutions', icon: Building2 },
  { label: 'Other Providers', icon: Headphones },
  { label: 'Authorities', icon: Scale },
];

const pillars = [
  {
    icon: Shield,
    title: 'Secure',
    desc: 'Secure handling of sensitive information at every step.',
  },
  {
    icon: Eye,
    title: 'Transparent',
    desc: 'Clear visibility and updates across the journey.',
  },
  {
    icon: Network,
    title: 'Connected',
    desc: 'All stakeholders coordinated on a single platform.',
  },
  {
    icon: Settings,
    title: 'Efficient',
    desc: 'Streamlined processes that save time and reduce complexity.',
  },
  {
    icon: BadgeCheck,
    title: 'Reliable',
    desc: 'End-to-end support you can depend on.',
  },
];

const forexProblems = [
  {
    icon: FileWarning,
    title: 'Non-convertible currencies',
    desc: 'Many markets require complex documentation and workarounds before funds can move at all.',
  },
  {
    icon: BadgeDollarSign,
    title: 'High conversion cost',
    desc: 'Fragmented currency routes and opaque spreads quietly erode working capital on every transfer.',
  },
  {
    icon: Clock3,
    title: 'Slow turnaround',
    desc: 'Long settlement cycles freeze treasury pools and delay supplier, payroll and repatriation flows.',
  },
  {
    icon: Layers,
    title: 'Too many providers',
    desc: 'Ad-hoc banks, brokers and intermediaries create operational noise instead of one accountable process.',
  },
];

const marketTrends = [
  {
    index: '01',
    title: 'Rising volatility, fewer conventional channels',
    body: 'More currencies are becoming difficult — or impossible — to convert through traditional banking rails. As commodity pressure rises, central banks hold tighter to currency reserves, making offshore settlements even harder.',
    implication:
      'Businesses struggle to meet USD and EUR obligations to suppliers, or to repatriate profits with confidence.',
  },
  {
    index: '02',
    title: 'Illiquid and restricted currency corridors',
    body: 'Some currencies are effectively non-convertible via banking channels — including EGP, BDT and AOA — while others such as ZAR, XAF, MAD and DZD are increasingly constrained.',
    implication:
      'Liquidity gaps put day-to-day operations and long-term sustainability under real pressure.',
  },
];

const forexCapabilities = [
  {
    value: '50+',
    label: 'Currencies',
    desc: 'Major, exotic and illiquid markets managed seamlessly.',
  },
  {
    value: '24H',
    label: 'Turnaround',
    desc: 'Inward and outward cross-border payments executed fast.',
  },
  {
    value: 'Africa+',
    label: 'Coverage',
    desc: 'Deep liquidity across African markets and beyond.',
  },
];

const forexProcess = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Digital due diligence',
    desc: 'A swift, fully digital KYC/compliance flow aligned with stringent international regulation.',
  },
  {
    step: '02',
    icon: Wallet,
    title: 'Account activation',
    desc: 'Your account goes live so treasury teams can access rates and corridor options in real time.',
  },
  {
    step: '03',
    icon: ArrowLeftRight,
    title: 'Trade & settle',
    desc: 'Execute online or OTC trades with clear visibility from instruction through settlement.',
  },
];

const compliancePillars = [
  {
    icon: Lock,
    title: 'Secure by design',
    desc: 'Sensitive documents, identities and transaction data protected at every handoff.',
  },
  {
    icon: FileCheck2,
    title: 'Regulation-ready',
    desc: 'Built for AML, KYC and cross-border compliance expectations across key markets.',
  },
  {
    icon: ClipboardList,
    title: 'Full audit trail',
    desc: 'Every approval, update and settlement event logged for transparency and review.',
  },
  {
    icon: ScanSearch,
    title: 'Risk visibility',
    desc: 'Clear exception handling so compliance teams stay informed without slowing the journey.',
  },
];

const complianceSteps = [
  {
    step: '01',
    title: 'Verify',
    desc: 'Collect and validate counterparty, beneficiary and documentation requirements digitally.',
  },
  {
    step: '02',
    title: 'Screen',
    desc: 'Apply compliance checks aligned to corridor rules before funds are instructed.',
  },
  {
    step: '03',
    title: 'Approve',
    desc: 'Route decisions to the right stakeholders with clear ownership and timestamps.',
  },
  {
    step: '04',
    title: 'Monitor',
    desc: 'Track settlement status and retain a complete record for reporting and assurance.',
  },
];

const journeyStages = [
  {
    icon: ClipboardList,
    title: 'Instruct',
    desc: 'Capture payment intent, currency pair, corridor and supporting documents in one place.',
  },
  {
    icon: Workflow,
    title: 'Coordinate',
    desc: 'Align banks, partners, authorities and internal teams around a single workflow.',
  },
  {
    icon: MapPinned,
    title: 'Settle',
    desc: 'Move value across borders with visibility from initiation through confirmation.',
  },
  {
    icon: MessageSquare,
    title: 'Communicate',
    desc: 'Keep every stakeholder informed with structured updates instead of scattered emails.',
  },
];

const whyNserve = [
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
];

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay, ease },
});

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">
      {children}
    </p>
  );
}

function AccentIcon({ accent, children, size = 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
  return (
    <span
      className={`${dim} rounded-xl flex items-center justify-center border shrink-0`}
      style={{
        backgroundColor: `${accent}14`,
        borderColor: `${accent}30`,
        color: accent,
      }}
    >
      {children}
    </span>
  );
}

function PlatformShell({
  id,
  accent,
  index,
  stackIndex = 0,
  isLast = false,
  title,
  titleAccent,
  subtitle,
  lead,
  children,
}) {
  const runwayRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end start'],
  });

  // As the next card scrolls over, this one gently scales back
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, isLast ? 1 : 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.9], [0, isLast ? 0 : -24]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.9], [0, isLast ? 0 : 0.35]);

  const stickyTop = `calc(5.25rem + ${stackIndex * 0.7}rem)`;
  const cardHeight = `calc(100svh - 5.85rem - ${stackIndex * 0.7}rem)`;

  return (
    <div
      ref={runwayRef}
      className="relative"
      style={{
        zIndex: stackIndex + 1,
        height: isLast ? cardHeight : '120vh',
        marginBottom: isLast ? '2rem' : '-18vh',
      }}
    >
      <motion.div
        id={id}
        className="sticky left-0 flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_28px_70px_-28px_rgba(15,23,42,0.35)] will-change-transform origin-top"
        style={{
          top: stickyTop,
          height: cardHeight,
          scale,
          y,
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-slate-900 rounded-2xl sm:rounded-3xl"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 12% 0%, ${accent}22, transparent 42%), radial-gradient(ellipse at 90% 20%, ${accent}10, transparent 40%), linear-gradient(165deg, #FFFFFF 0%, #F7F9FC 48%, #EEF2F7 100%)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)` }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 md:gap-5 pb-4 md:pb-5 border-b border-slate-200/80 shrink-0">
            <div className="flex items-start gap-3 sm:gap-5 md:gap-6">
              <motion.span
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl shrink-0 font-bold leading-none tabular-nums"
                style={{ color: accent }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 0.28, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease }}
              >
                {index}
              </motion.span>
              <div className="flex flex-col gap-1.5 sm:gap-2 pt-1 md:pt-2 min-w-0">
                <motion.h3
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
                  {...fadeUp(0.05)}
                >
                  {titleAccent ? (
                    <>
                      {title}
                      <span style={{ color: accent }}>{titleAccent}</span>
                    </>
                  ) : (
                    title
                  )}
                </motion.h3>
                <motion.p className="text-slate-600 text-sm sm:text-base md:text-lg" {...fadeUp(0.1)}>
                  {subtitle}
                </motion.p>
              </div>
            </div>

            <motion.p
              className="text-sm sm:text-base md:text-xl border-l-[3px] pl-4 md:pl-5 max-w-3xl text-slate-800 font-medium leading-snug"
              style={{ borderColor: accent }}
              {...fadeUp(0.15)}
            >
              {lead}
            </motion.p>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto hide-scrollbar flex-1 mt-4 bg-white/75 backdrop-blur-md rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CardOne({ accent }) {
  return (
    <PlatformShell
      id="parallax-card-1"
      accent={accent}
      index="01"
      stackIndex={0}
      title="n"
      titleAccent="SERVE"
      subtitle="Technology-enabled repatriation services"
      lead="One Process. Multiple Stakeholders. Seamless Coordination."
    >
      <motion.p className="text-sm sm:text-base text-slate-700 leading-relaxed" {...fadeUp(0.05)}>
        nSERVE is a technology-enabled repatriation services organisation focused on simplifying
        complex cross-border repatriation and foreign exchange processes through seamless
        coordination, secure information management and end-to-end support.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-3">
        <motion.div
          className="flex gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4"
          {...fadeUp(0.1)}
        >
          <Users className="shrink-0 mt-0.5 text-sky-600" size={20} strokeWidth={1.75} />
          <p className="text-sm text-slate-600 leading-relaxed">
            Repatriation often requires coordination between families, authorities, embassies and
            consulates, airlines and logistics partners, hospitals, insurers, financial institutions
            and other service providers across multiple locations.
          </p>
        </motion.div>
        <motion.div
          className="flex gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4"
          {...fadeUp(0.15)}
        >
          <CheckCircle2 className="shrink-0 mt-0.5 text-emerald-600" size={20} strokeWidth={1.75} />
          <p className="text-sm text-slate-600 leading-relaxed">
            nSERVE brings these stakeholders together through a structured and transparent workflow,
            helping ensure that every stage of the process is managed efficiently.
          </p>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.18)}>
        <SectionLabel>Technology · Coordination · Trust</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {stakeholders.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              className="group flex flex-col items-center text-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white px-2 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
                style={{
                  backgroundColor: `${accent}12`,
                  borderColor: `${accent}28`,
                  color: accent,
                }}
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-snug">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-slate-200 bg-slate-200/70"
        {...fadeUp(0.22)}
      >
        {pillars.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            className="bg-white p-3.5 sm:p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
          >
            <Icon size={18} className="mb-2" style={{ color: accent }} strokeWidth={1.75} />
            <h4 className="text-sm font-semibold text-slate-900 mb-1 font-display">{title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </PlatformShell>
  );
}

function CardTwo({ accent }) {
  return (
    <PlatformShell
      id="parallax-card-2"
      accent={accent}
      index="02"
      stackIndex={1}
      title="Cross-border currency"
      subtitle="Liquidity across Africa — and beyond"
      lead="Inward and outward payments executed in under 24 hours."
    >
      <motion.p className="text-sm sm:text-base text-slate-700 leading-relaxed" {...fadeUp(0.05)}>
        nSERVE provides currency liquidity across most African markets — and selected corridors worldwide —
        for both inward and outward payments. Our objective is simple: move cross-border value
        securely, with speed, clarity and fewer intermediaries.
      </motion.p>

      <motion.div {...fadeUp(0.08)}>
        <SectionLabel>Problems we solve</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {forexProblems.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 transition-colors hover:bg-white"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <AccentIcon accent={accent} size="sm">
                  <Icon size={16} strokeWidth={1.75} />
                </AccentIcon>
                <h5 className="text-sm font-semibold text-slate-900 font-display">{title}</h5>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.12)}>
        <SectionLabel>Understanding the market</SectionLabel>
        <div className="space-y-3">
          {marketTrends.map(({ index, title, body, implication }) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span
                  className="font-display text-2xl sm:text-3xl font-bold leading-none shrink-0 tabular-nums"
                  style={{ color: accent, opacity: 0.4 }}
                >
                  {index}
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-1.5 font-display">
                    {title}
                  </h5>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">{body}</p>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    <span className="font-semibold" style={{ color: accent }}>
                      Client impact:{' '}
                    </span>
                    {implication}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.16)}>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={15} style={{ color: accent }} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 m-0">
            Proposed solution
          </p>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          Deep liquidity, broad currency coverage and a 24-hour operating model — purpose-built for
          restricted, exotic and high-friction corridors where conventional banking falls short.
        </p>
        <div className="grid sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-slate-200 bg-slate-200/70">
          {forexCapabilities.map(({ value, label, desc }, i) => (
            <motion.div
              key={label}
              className="bg-white p-4 sm:p-5 text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
            >
              <div
                className="font-display text-3xl sm:text-4xl font-bold mb-1 tracking-tight"
                style={{ color: accent }}
              >
                {value}
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">{label}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-4 flex gap-3"
        {...fadeUp(0.18)}
      >
        <Globe2 className="shrink-0 mt-0.5" size={18} style={{ color: accent }} />
        <p className="text-sm text-slate-600 leading-relaxed">
          Capability spans core African corridors and additional currency markets on request — including
          complex environments where convertibility, documentation and speed usually break
          traditional payment journeys.
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.2)}>
        <SectionLabel>How it works</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-3">
          {forexProcess.map(({ step, icon: Icon, title, desc }, i) => (
            <motion.div
              key={step}
              className="relative rounded-2xl border border-slate-200/90 bg-white p-4 overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
            >
              <div
                className="absolute top-0 inset-x-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between mb-3">
                <AccentIcon accent={accent}>
                  <Icon size={16} strokeWidth={1.75} />
                </AccentIcon>
                <span
                  className="font-display text-lg font-bold tabular-nums"
                  style={{ color: accent, opacity: 0.35 }}
                >
                  {step}
                </span>
              </div>
              <h5 className="text-sm font-semibold text-slate-900 mb-1.5 font-display">{title}</h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PlatformShell>
  );
}

function CardThree({ accent }) {
  return (
    <PlatformShell
      id="parallax-card-3"
      accent={accent}
      index="03"
      stackIndex={2}
      title="Compliance & Control"
      subtitle="Secure information. Clear accountability. Regulation-ready workflows."
      lead="Cross-border movement without compromising trust, documentation or oversight."
    >
      <motion.p className="text-sm sm:text-base text-slate-700 leading-relaxed" {...fadeUp(0.05)}>
        Every cross-border payment carries regulatory, documentation and information-risk
        requirements. nSERVE embeds compliance into the journey — so teams can move faster without
        losing control of sensitive data, approvals or auditability.
      </motion.p>

      <motion.div {...fadeUp(0.08)}>
        <SectionLabel>What this enables</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {compliancePillars.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <AccentIcon accent={accent} size="sm">
                  <Icon size={16} strokeWidth={1.75} />
                </AccentIcon>
                <h5 className="text-sm font-semibold text-slate-900 font-display">{title}</h5>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.12)}>
        <SectionLabel>Compliance flow</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-slate-200 bg-slate-200/70">
          {complianceSteps.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              className="bg-white p-4 relative"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div
                className="font-display text-2xl font-bold mb-2 tabular-nums"
                style={{ color: accent, opacity: 0.4 }}
              >
                {step}
              </div>
              <h5 className="text-sm font-semibold text-slate-900 mb-1.5 font-display">{title}</h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-4 flex gap-3"
        {...fadeUp(0.16)}
      >
        <ShieldCheck className="shrink-0 mt-0.5" size={18} style={{ color: accent }} />
        <p className="text-sm text-slate-600 leading-relaxed">
          From due diligence to settlement monitoring, compliance is treated as part of the operating
          system — not a separate bottleneck attached after the fact.
        </p>
      </motion.div>
    </PlatformShell>
  );
}

function CardFour({ accent }) {
  return (
    <PlatformShell
      id="parallax-card-4"
      accent={accent}
      index="04"
      stackIndex={3}
      isLast
      title="End-to-End Journey"
      subtitle="Different countries. Different currencies. One connected process."
      lead="Every payment has a journey — nSERVE connects every step."
    >
      <motion.p className="text-sm sm:text-base text-slate-700 leading-relaxed" {...fadeUp(0.05)}>
        Cross-border success is rarely just about sending funds. It is about orchestrating people,
        paperwork, partners and payment rails into one dependable journey — with visibility from
        instruction to confirmation.
      </motion.p>

      <motion.div {...fadeUp(0.08)}>
        <SectionLabel>Journey stages</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {journeyStages.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <AccentIcon accent={accent} size="sm">
                  <Icon size={16} strokeWidth={1.75} />
                </AccentIcon>
                <h5 className="text-sm font-semibold text-slate-900 font-display">{title}</h5>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.12)}>
        <SectionLabel>Why teams choose nSERVE</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {whyNserve.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: accent }}
                  strokeWidth={1.75}
                />
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-1 font-display">{title}</h5>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="rounded-2xl border p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          borderColor: `${accent}40`,
          background: `linear-gradient(135deg, ${accent}14, #ffffff 52%)`,
        }}
        {...fadeUp(0.16)}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Rocket size={18} style={{ color: accent }} />
            <h4 className="font-display text-lg font-semibold text-slate-900">
              Ready to connect your corridors?
            </h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            Talk to nSERVE about repatriation coordination, currency liquidity and a connected process
            built for complex cross-border operations.
          </p>
        </div>
        <a
          href="#cta"
          className="group inline-flex items-center justify-center gap-2 shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ backgroundColor: accent }}
        >
          Talk to an expert
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </PlatformShell>
  );
}

const platforms = [
  { id: '01', label: 'nSERVE', color: '#1D4ED8' },
  { id: '02', label: 'Currency', color: '#EA580C' },
  { id: '03', label: 'Compliance', color: '#0EA5E9' },
  { id: '04', label: 'Journey', color: '#EF4444' },
];

export default function ParallaxServices() {
  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden" aria-label="Services">
      <div className="absolute inset-0 bg-[#F5F7FB]" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 15% 8%, rgba(234,88,12,0.07), transparent 40%), radial-gradient(ellipse at 85% 20%, rgba(14,165,233,0.07), transparent 38%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-6">
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
          className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          Four connected layers — from repatriation coordination to currency liquidity, compliance and the
          full payment journey.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          aria-hidden="true"
        >
          {platforms.map(({ id, label, color }) => (
            <span
              key={id}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="tabular-nums text-slate-400">{id}</span>
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 pb-16 max-w-[90rem] mx-auto">
        <CardOne accent="#1D4ED8" />
        <CardTwo accent="#EA580C" />
        <CardThree accent="#0EA5E9" />
        <CardFour accent="#EF4444" />
      </div>
    </section>
  );
}
