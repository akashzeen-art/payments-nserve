import { useEffect, useMemo, useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Search, MapPinned } from 'lucide-react';
import { markets, paymentRoutes } from '../data/paymentRoutes';
import StatsSection from './StatsSection';

const AmChartsGlobe = lazy(() => import('./AmChartsGlobe'));

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease },
});

function MarketPanel({ open, onClose, selected, onSelect, mobile }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return markets.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.currency.toLowerCase().includes(q) ||
        m.currencyName.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q),
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
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-200/80">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MapPinned size={15} className="text-orange-600 shrink-0" />
            <h3 className="text-slate-900 font-semibold font-display tracking-tight">
              Corridor Markets
            </h3>
          </div>
          <p className="text-xs text-slate-500">Select a market to highlight routes</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Close markets panel"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-3 sm:p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus-within:border-orange-300 focus-within:bg-white transition-colors">
          <Search size={14} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search markets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-full"
            aria-label="Search markets"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto py-2 max-h-[60vh] md:max-h-none hide-scrollbar">
        {filtered.map((m) => {
          const active = selected === m.id;
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onSelect(active ? null : m.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left border-l-[3px] ${
                  active
                    ? 'bg-orange-50/90 border-orange-500'
                    : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 border ${
                    active
                      ? 'bg-white border-orange-200 shadow-sm'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                  aria-hidden="true"
                >
                  {m.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 text-sm font-semibold">{m.name}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {m.id}
                    </span>
                  </div>
                  <div className="text-slate-500 text-xs truncate mt-0.5">
                    {m.currency} · {m.currencyName}
                  </div>
                </div>
                {active && (
                  <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0 shadow-[0_0_8px_rgba(234,88,12,0.55)]" />
                )}
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-slate-500">No markets found</li>
        )}
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
              className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close markets panel overlay"
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-white border-t border-slate-200 rounded-t-3xl max-h-[78vh] flex flex-col shadow-2xl"
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
          className="absolute left-0 top-0 bottom-0 w-[18.5rem] bg-white/92 backdrop-blur-xl border-r border-slate-200/90 z-20 hidden md:flex flex-col shadow-[8px_0_32px_-20px_rgba(15,23,42,0.2)]"
          role="dialog"
          aria-label="Corridor markets"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3, ease }}
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 12% 10%, rgba(234,88,12,0.1), transparent 42%), radial-gradient(ellipse at 88% 20%, rgba(14,165,233,0.09), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-12 max-w-3xl">
          <motion.p
            className="text-orange-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3"
            {...fadeUp(0)}
          >
            Global Presence
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-4 leading-[1.12] tracking-tight"
            {...fadeUp(0.06)}
          >
            Different countries. Different currencies.{' '}
            <span className="text-gradient">One connected process.</span>
          </motion.h2>
          <motion.p className="text-slate-600 text-base sm:text-lg leading-relaxed" {...fadeUp(0.12)}>
            Explore nSERVE corridors on the world map — select a market to highlight payment routes.
          </motion.p>
        </div>

        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.28)]"
          {...fadeUp(0.16)}
        >
          <div
            className="absolute inset-x-0 top-0 h-1 z-10"
            style={{
              background: 'linear-gradient(90deg, #EA580C, #F59E0B 40%, #0EA5E9 100%)',
            }}
            aria-hidden="true"
          />

          <MarketPanel
            open={panelOpen}
            onClose={closePanel}
            selected={selectedMarket}
            onSelect={setSelectedMarket}
            mobile={isMobile}
          />

          {/* Toggle — shifts right of the panel when open so nothing overlaps */}
          <AnimatePresence>
            {!(panelOpen && isMobile) && (
              <motion.div
                className={`absolute bottom-5 z-30 transition-all duration-300 ${
                  panelOpen && !isMobile ? 'left-[calc(18.5rem+1.25rem)]' : 'left-5'
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setPanelOpen((v) => !v)}
                  className="group inline-flex items-center gap-2.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white pl-3.5 pr-4 py-3 shadow-lg shadow-orange-500/25 border border-orange-500/20 transition-colors"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={panelOpen ? 'Close markets panel' : 'Explore markets'}
                  aria-expanded={panelOpen}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                    {panelOpen ? <X size={18} /> : <Plus size={18} />}
                  </span>
                  <span className="text-sm font-semibold tracking-tight">
                    {panelOpen ? 'Hide markets' : 'Explore markets'}
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selected && (
              <motion.div
                className="absolute top-5 right-4 z-30 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-orange-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 shadow-sm max-w-[min(100%-2rem,20rem)]"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <span aria-hidden="true">{selected.flag}</span>
                <span className="min-w-0 truncate">
                  <span className="font-semibold">{selected.name}</span>
                  <span className="text-slate-500">
                    {' '}
                    · {selected.currency} · {activeRoutes.length} corridor
                    {activeRoutes.length === 1 ? '' : 's'}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMarket(null)}
                  className="text-slate-400 hover:text-orange-600 ml-0.5 p-0.5 rounded-md hover:bg-orange-50 transition-colors shrink-0"
                  aria-label="Clear market filter"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`transition-[padding] duration-300 ${
              panelOpen && !isMobile ? 'md:pl-[18.5rem]' : ''
            }`}
          >
            <Suspense
              fallback={
                <div className="h-[480px] sm:h-[560px] lg:h-[620px] flex flex-col items-center justify-center gap-3 text-slate-500 text-sm bg-[#F5F7FB]">
                  <span className="h-8 w-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
                  Loading map…
                </div>
              }
            >
              <AmChartsGlobe selectedId={selectedMarket} onSelect={setSelectedMarket} />
            </Suspense>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap justify-start sm:justify-center gap-2"
          {...fadeUp(0.2)}
        >
          {markets.map((m) => {
            const active = selectedMarket === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMarket((prev) => (prev === m.id ? null : m.id))}
                className={`inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-2 rounded-xl border transition-all duration-200 ${
                  active
                    ? 'bg-orange-50 border-orange-300 text-orange-800 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white/80'
                }`}
              >
                <span aria-hidden="true">{m.flag}</span>
                <span className="font-medium">
                  {m.id} · {m.name}
                </span>
              </button>
            );
          })}
        </motion.div>

        <StatsSection />
      </div>
    </section>
  );
}
