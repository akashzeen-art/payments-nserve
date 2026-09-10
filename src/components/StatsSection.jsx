import { motion } from 'framer-motion';
import { useCountUp, useInView } from '../hooks/useCountUp';

const stats = [
  { id: 'markets', target: 23, suffix: '', label: 'Priority Markets', decimals: 0 },
  { id: 'currencies', target: 29, suffix: '', label: 'Currencies', decimals: 0 },
  { id: 'pillars', target: 5, suffix: '', label: 'Operating Pillars', decimals: 0 },
  { id: 'infra', target: 24, suffix: '/7', label: 'Coordination Layer', decimals: 0 },
];

function StatCell({ target, suffix, label, decimals, enabled, delay }) {
  const value = useCountUp(target, { enabled, decimals, duration: 1400 });
  const display = decimals > 0 ? value.toFixed(decimals) : value.toLocaleString('en-US');

  return (
    <motion.div
      className="text-center px-4 py-6 sm:py-7 bg-white"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-1.5 tracking-tight">
        <span className="text-gradient">
          {display}
          {suffix}
        </span>
      </div>
      <div className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-slate-200 bg-slate-200/80 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)]"
    >
      {stats.map((stat, i) => (
        <StatCell key={stat.id} {...stat} enabled={inView} delay={i * 0.08} />
      ))}
    </div>
  );
}
