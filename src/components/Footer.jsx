import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

const CONTACT_EMAIL = 'Vivek@nserevetech.com';
const CONTACT_PHONE = '+971 52 969 2827';
const CONTACT_PHONE_TEL = '+971529692827';

const ease = [0.22, 1, 0.36, 1];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200" role="contentinfo">
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 10% 0%, rgba(234,88,12,0.1), transparent 42%), radial-gradient(ellipse at 90% 30%, rgba(14,165,233,0.08), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/35 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-16 lg:pb-10">
        <motion.div
          className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease }}
        >
          {/* Brand */}
          <div className="max-w-lg">
            <a
              href="#top"
              className="inline-flex items-center gap-3 group mb-5"
              aria-label="nSERVE Home"
            >
              <img
                src="/nservelogo.png"
                alt=""
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                aria-hidden="true"
              />
              <span className="font-display text-2xl font-bold tracking-tight text-slate-900">
                nSERVE
              </span>
            </a>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Connecting People.{' '}
              <span className="text-slate-900 font-medium">Payments.</span>{' '}
              <span className="text-slate-900 font-medium">Processes.</span>
              <span className="block mt-1 text-gradient font-medium">Across Borders.</span>
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600 mb-4">
              Contact Us
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/5 px-4 py-3.5 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100 group-hover:bg-orange-100/80 transition-colors">
                    <Mail size={17} strokeWidth={1.85} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-0.5">
                      Email
                    </span>
                    <span className="block text-sm sm:text-[15px] text-slate-800 truncate group-hover:text-slate-900">
                      {CONTACT_EMAIL}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-slate-300 group-hover:text-orange-500 shrink-0 transition-colors"
                />
              </a>

              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 hover:border-sky-300 hover:shadow-md hover:shadow-sky-500/5 px-4 py-3.5 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 group-hover:bg-sky-100/80 transition-colors">
                    <Phone size={17} strokeWidth={1.85} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-0.5">
                      Phone
                    </span>
                    <span className="block text-sm sm:text-[15px] text-slate-800 group-hover:text-slate-900">
                      {CONTACT_PHONE}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-slate-300 group-hover:text-sky-500 shrink-0 transition-colors"
                />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 pt-6 border-t border-slate-200/80 text-center">
          <p className="text-slate-500 text-sm">© 2026 nSERVE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
