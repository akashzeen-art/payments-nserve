import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Link2, Gauge, Workflow } from 'lucide-react';

const cards = [
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

export default function SecuritySection() {
  return (
    <section id="about" className="relative py-20 lg:py-24 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FB] to-[#EEF2F7]" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-orange-600 text-sm font-semibold tracking-[0.18em] uppercase mb-3">Why nSERVE</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Cross-border payments are more than moving funds.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            They involve multiple stakeholders, currencies, documentation, regulatory requirements,
            payment channels, approvals and ongoing communication. nSERVE brings these moving parts
            together through a technology-enabled coordination layer.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-xl p-5 border border-slate-200 bg-white hover:border-orange-300 transition-all duration-300 group shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-lg border border-orange-200 bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                <Icon size={18} className="text-orange-600" strokeWidth={1.75} />
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
