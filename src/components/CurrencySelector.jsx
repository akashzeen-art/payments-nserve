import { useState, useRef, useEffect, useId } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import { currencies } from '../data/currencies';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencySelector({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const listId = useId();
  const selected = currencies.find((c) => c.code === value) || currencies[0];

  const filtered = currencies.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  const choose = (code) => {
    onChange(code);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault();
      choose(filtered[activeIndex].code);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <label className="block text-[11px] text-slate-500 mb-2 font-semibold uppercase tracking-[0.14em]">
        {label}
      </label>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setQuery('');
        }}
        onKeyDown={onKeyDown}
        className="w-full flex items-center justify-between gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 rounded-xl px-4 py-3.5 transition-all duration-200 shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl leading-none shrink-0" aria-hidden="true">
            {selected.flag}
          </span>
          <div className="text-left min-w-0">
            <div className="text-slate-900 font-semibold text-sm tracking-wide">{selected.code}</div>
            <div className="text-slate-500 text-xs truncate">{selected.name}</div>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <div className="p-2 border-b border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search currency..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-full"
                  aria-label="Search currencies"
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-700" aria-label="Clear search">
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
            <ul id={listId} role="listbox" className="max-h-52 overflow-y-auto py-1">
              {filtered.map((c, i) => (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.code === value}
                    onClick={() => choose(c.code)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left ${
                      c.code === value || i === activeIndex ? 'bg-orange-50' : ''
                    }`}
                  >
                    <span className="text-lg" aria-hidden="true">{c.flag}</span>
                    <div>
                      <div className="text-slate-900 text-sm font-medium">{c.code} · {c.symbol}</div>
                      <div className="text-slate-500 text-xs">{c.name} · {c.country}</div>
                    </div>
                    {c.code === value && <Check size={14} className="ml-auto text-orange-600" />}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-slate-500 text-sm text-center">No currencies found</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
