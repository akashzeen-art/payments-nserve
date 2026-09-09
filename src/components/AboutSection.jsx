import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Link2, Gauge, Workflow } from 'lucide-react';

const ACCENT = '#EA580C';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Secure',
    desc: 'Enterprise-grade controls designed for sensitive cross-border payment journeys.',
  },
  {
    icon: Eye,
    title: 'Transparent',
    desc: 'Greater visibility across stakeholders, documentation, channels and approvals.',
  },
  {
    icon: Link2,
    title: 'Connected',
    desc: 'People, information, processes and payment ecosystems linked in one layer.',
  },
  {
    icon: Gauge,
    title: 'Effective',
    desc: 'Structure and control that reduce friction without slowing critical payments.',
  },
  {
    icon: Workflow,
    title: 'End to End',
    desc: 'Coordinate the full journey around the payment — not just the fund movement.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FB] via-[#EEF2F7] to-[#F5F7FB]" />
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div
        className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(234, 88, 12, 0.08)' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="relative z-10 flex flex-col rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md overflow-hidden min-h-[520px] md:min-h-[560px] shadow-sm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-10 flex flex-col h-full p-4 md:p-8">
            {/* Header block */}
            <div className="flex flex-col gap-5 md:gap-6 pb-5 md:pb-6 border-b border-slate-200 shrink-0">
              <div className="flex items-start gap-4 md:gap-6">
                <span
                  className="font-display text-6xl md:text-8xl shrink-0 font-bold leading-none"
                  style={{
                    color: ACCENT,
                    opacity: 0.35,
                  }}
                >
                  01
                </span>
                <div className="flex flex-col gap-2 pt-1 md:pt-2 min-w-0">
                  <h2
                    className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                    style={{ color: ACCENT }}
                  >
                    welcome to &ldquo;nSERVE&rdquo;
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg md:text-xl">
                    Cross-Border Payments
                  </p>
                </div>
              </div>

              <p
                className="text-lg sm:text-xl md:text-2xl border-l-[3px] pl-4 md:pl-5 max-w-3xl font-medium text-slate-900"
                style={{ borderColor: ACCENT }}
              >
                Connecting People. Payments. Processes. Across Borders.
              </p>
            </div>

            {/* Scrollable body */}
            <div className="flex flex-col gap-5 overflow-y-auto hide-scrollbar flex-1 mt-4 bg-slate-50/80 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-slate-200 max-h-[340px] md:max-h-[380px]">
              <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                Cross-border payments are more than the movement of funds from one country to another.
                They involve multiple stakeholders, currencies, documentation, regulatory requirements,
                payment channels, approvals and ongoing communication.
              </p>

              <h3
                className="text-sm md:text-base font-semibold tracking-wide uppercase"
                style={{ color: ACCENT }}
              >
                A technology-enabled coordination layer
              </h3>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                nSERVE brings these moving parts together — helping organisations manage the journey
                around the payment with greater visibility, structure and control. Secure. Transparent.
                Connected. Effective. End to End.
              </p>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                nSERVE aims to simplify the complexity behind every transaction by connecting people,
                information, processes and payment ecosystems across borders. Every payment has a
                journey — nSERVE connects every step. Different countries, different currencies and one
                connected process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Operating pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-xl p-5 border border-slate-200 bg-white hover:border-orange-300 transition-all duration-300 group shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
            >
              <div
                className="w-10 h-10 rounded-lg border flex items-center justify-center mb-4 transition-colors"
                style={{
                  borderColor: 'rgba(234,88,12,0.25)',
                  background: 'rgba(234,88,12,0.08)',
                }}
              >
                <Icon size={18} style={{ color: ACCENT }} strokeWidth={1.75} />
              </div>
              <h3 className="text-slate-900 font-semibold mb-2 font-display">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
