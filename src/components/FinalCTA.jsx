import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const CONTACT_EMAIL = 'Vivek@nserevetech.com';
const CONTACT_PHONE = '+971 52 969 2827';
const CONTACT_PHONE_TEL = '+971529692827';

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[#EEF2F7]" />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-transparent to-sky-100/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-400/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Contact Us</p>

          <motion.h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            Every payment has a journey.
            <span className="block text-gradient">nSERVE connects every step.</span>
          </motion.h2>

          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Reach out by email or phone — we&apos;ll help you connect people, payments and processes across borders.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-2">
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-orange-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail size={18} />
              {CONTACT_EMAIL}
            </motion.a>
            <motion.a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2.5 text-slate-700 border border-slate-300 hover:border-slate-400 px-6 py-4 rounded-xl transition-all duration-200 hover:bg-white font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={18} />
              {CONTACT_PHONE}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
