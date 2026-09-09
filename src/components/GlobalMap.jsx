import { useEffect, useMemo, useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Search } from 'lucide-react';
import { markets, paymentRoutes } from '../data/paymentRoutes';
import StatsSection from './StatsSection';

const AmChartsGlobe = lazy(() => import('./AmChartsGlobe'));

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function MarketPanel({ open, onClose, selected, onSelect, mobile }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return markets.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.currency.toLowerCase().includes(q) ||
        m.currencyName.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const panelBody = (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div>
          <h3 className="text-slate-900 font-semibold font-display">Corridor Markets</h3>
          <p className="text-xs text-slate-500 mt-0.5">Click a market to highlight routes</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close markets panel"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-3 border-b border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
          <Search size={13} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-full"
            aria-label="Search markets"
          />
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto py-2 max-h-[60vh] md:max-h-none">
        {filtered.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => onSelect(selected === m.id ? null : m.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${
                selected === m.id ? 'bg-red-50 border-l-2 border-red-500' : 'border-l-2 border-transparent'
              }`}
            >
              <span className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                {m.id}
              </span>
              <div className="min-w-0">
                <div className="text-slate-900 text-sm font-semibold">{m.name}</div>
                <div className="text-slate-500 text-xs truncate">
                  {m.currency} · {m.currencyName}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  if (mobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close markets panel overlay"
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-white border-t border-slate-200 rounded-t-2xl max-h-[78vh] flex flex-col shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Corridor markets"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-slate-300" />
              {panelBody}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200 z-20 hidden md:flex flex-col"
          role="dialog"
          aria-label="Corridor markets"
          initial={{ x: -288 }}
          animate={{ x: 0 }}
          exit={{ x: -288 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {panelBody}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GlobalMap() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => {
      setIsMobile(mq.matches);
      if (mq.matches) setPanelOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const closePanel = useCallback(() => setPanelOpen(false), []);
  const selected = markets.find((m) => m.id === selectedMarket);
  const activeRoutes = paymentRoutes.filter(
    (r) => !selectedMarket || r.from === selectedMarket || r.to === selectedMarket,
  );

  return (
    <section id="map" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[#F5F7FB]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p className="text-orange-600 text-sm font-semibold tracking-[0.18em] uppercase mb-3" {...fadeUp(0)}>
            Global Presence
          </motion.p>
          <motion.h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4" {...fadeUp(0.08)}>
            Different countries. Different currencies.
            <br />
            <span className="text-gradient">One connected process.</span>
          </motion.h2>
          <motion.p className="text-slate-600 text-lg max-w-2xl mx-auto" {...fadeUp(0.16)}>
            Explore nSERVE corridors on a fixed world map — highlight markets and payment routes.
          </motion.p>
        </div>

        <motion.div
          className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm"
          {...fadeUp(0.18)}
        >
          <MarketPanel
            open={panelOpen}
            onClose={closePanel}
            selected={selectedMarket}
            onSelect={setSelectedMarket}
            mobile={isMobile}
          />

          <div className="absolute bottom-5 left-5 z-30 flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-colors"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Explore markets"
              aria-expanded={panelOpen}
            >
              {panelOpen ? <X size={20} /> : <Plus size={20} />}
            </motion.button>
            <span className="hidden sm:inline text-sm text-slate-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              Explore markets
            </span>
          </div>

          {selected && (
            <motion.div
              className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1.5 text-sm text-red-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {selected.name} · {selected.currency} · {activeRoutes.length} connected corridor
              {activeRoutes.length === 1 ? '' : 's'}
              <button
                type="button"
                onClick={() => setSelectedMarket(null)}
                className="text-red-500 hover:text-red-700 ml-1"
                aria-label="Clear market filter"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}

          <div className={`transition-[padding] duration-300 ${panelOpen && !isMobile ? 'md:pl-72' : ''}`}>
            <Suspense
              fallback={
                <div className="h-[480px] sm:h-[560px] lg:h-[620px] flex items-center justify-center text-slate-500 text-sm bg-[#F5F7FB]">
                  Loading map…
                </div>
              }
            >
              <AmChartsGlobe selectedId={selectedMarket} onSelect={setSelectedMarket} />
            </Suspense>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {markets.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMarket((prev) => (prev === m.id ? null : m.id))}
              className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors ${
                selectedMarket === m.id
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white'
              }`}
            >
              {m.id} · {m.name}
            </button>
          ))}
        </div>

        <StatsSection />
      </div>
    </section>
  );
}
