import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#about' },
  { label: 'Corridors', href: '#map' },
  { label: 'Contact', href: '#cta' },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { scrolled } = useScroll(24);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'mx-3 sm:mx-4 mt-3 rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)]'
            : 'mx-0 mt-0 rounded-none border-transparent bg-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[4.25rem] flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="nSERVE Home"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/nservelogo.png"
              alt=""
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              aria-hidden="true"
            />
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              nSERVE
            </span>
          </a>

          <nav
            className="hidden md:flex items-center gap-1 lg:gap-1.5"
            aria-label="Main navigation"
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 group"
              >
                {label}
                <span className="absolute left-3.5 right-3.5 bottom-1 h-px origin-left scale-x-0 bg-orange-600 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight size={14} />
            </a>

            <button
              type="button"
              className="md:hidden text-slate-800 p-2.5 rounded-xl border border-slate-200/80 bg-white/70 hover:bg-slate-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-nav"
              className="md:hidden border-t border-slate-200/80 px-4 pb-5 pt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease }}
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-0.5">
                {navLinks.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-3.5 text-base font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50/70 transition-colors"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3, ease }}
                  >
                    {label}
                    <ArrowRight size={16} className="text-slate-300" />
                  </motion.a>
                ))}
              </div>

              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex w-full items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-3.5 rounded-xl transition-colors"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
