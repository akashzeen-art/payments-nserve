import { motion } from 'framer-motion';
import { BookOpen, FileText, HelpCircle, LifeBuoy } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: 'Documentation',
    desc: 'API guides, SDKs, and integration recipes for your stack.',
    href: '#',
  },
  {
    icon: FileText,
    title: 'Blog',
    desc: 'Product updates, corridor insights, and treasury playbooks.',
    href: '#',
  },
  {
    icon: HelpCircle,
    title: 'FAQs',
    desc: 'Answers on settlement, rate spreads, KYC, and onboarding.',
    href: '#',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    desc: '24/7 specialist support for live payment operations.',
    href: '#',
  },
];

export default function ResourcesSection() {
  return (
    <section id="resources" className="relative py-20 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-orange-600 text-sm font-semibold tracking-[0.18em] uppercase mb-3">Resources</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Everything you need to go live.
          </h2>
          <p className="text-slate-600">
            Explore guides, product updates, and support channels built for global payment teams.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map(({ icon: Icon, title, desc, href }, i) => (
            <motion.a
              key={title}
              href={href}
              className="group block p-5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/40 transition-all duration-300 shadow-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Icon size={18} className="text-sky-600 mb-4" strokeWidth={1.75} />
              <div className="text-slate-900 font-semibold mb-1.5 font-display group-hover:text-sky-700 transition-colors">
                {title}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
