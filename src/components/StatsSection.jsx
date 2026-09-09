import { motion } from 'framer-motion';
import { useCountUp, useInView } from '../hooks/useCountUp';

const stats = [
  { id: 'markets', target: 8, suffix: '', label: 'Priority Markets', decimals: 0 },
  { id: 'currencies', target: 14, suffix: '+', label: 'Currencies', decimals: 0 },
  { id: 'pillars', target: 5, suffix: '', label: 'Operating Pillars', decimals: 0 },
  { id: 'infra', target: 24, suffix: '/7', label: 'Coordination Layer', decimals: 0 },
];

function StatCard({ target, suffix, label, decimals, enabled, delay }) {
  const value = useCountUp(target, { enabled, decimals, duration: 1400 });
  const display = decimals > 0 ? value.toFixed(decimals) : value.toLocaleString('en-US');

  return (
    <motion.div
      className="text-center p-6 glass rounded-xl bg-white border border-slate-200 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-1 shimmer-text">
        {display}
        {suffix}
      </div>
      <div className="text-slate-600 text-sm">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
      {stats.map((stat, i) => (
        <StatCard key={stat.id} {...stat} enabled={inView} delay={i * 0.08} />
      ))}
    </div>
  );
}
