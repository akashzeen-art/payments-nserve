import { useState, useRef, useEffect, useId } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import { currencies } from '../data/currencies';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencySelector({
  value,
  onChange,
  label,
  exclude = [],
  locked = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const listId = useId();
  const selected = currencies.find((c) => c.code === value) || currencies[0];

  const available = currencies.filter((c) => !exclude.includes(c.code));

  const filtered = available.filter((c) => {
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
    if (locked) return;
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
      <label className="block text-[10px] text-slate-500 mb-1.5 font-semibold uppercase tracking-[0.14em]">
        {label}
      </label>
      <button
        type="button"
        disabled={locked}
        onClick={() => {
          if (locked) return;
          setOpen((v) => !v);
          setQuery('');
        }}
        onKeyDown={onKeyDown}
        className={`w-full flex items-center justify-between gap-2.5 bg-white border rounded-lg px-3 py-2.5 transition-all duration-200 shadow-sm text-left ${
          locked
            ? 'border-slate-200 cursor-default opacity-95'
            : open
              ? 'border-orange-400 ring-2 ring-orange-500/15'
              : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'
        }`}
        aria-haspopup={locked ? undefined : 'listbox'}
        aria-expanded={locked ? undefined : open}
        aria-controls={locked ? undefined : listId}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-base leading-none shrink-0"
            aria-hidden="true"
          >
            {selected.flag}
          </span>
          <div className="text-left min-w-0">
            <div className="text-slate-900 font-semibold text-xs tracking-wide">
              {selected.code}
              <span className="text-slate-400 font-medium"> · {selected.symbol}</span>
            </div>
            <div className="text-slate-500 text-[11px] truncate">{selected.name}</div>
          </div>
        </div>
        {locked ? null : (
          <ChevronDown
            size={14}
            className={`text-slate-400 shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180 text-orange-500' : ''
            }`}
          />
        )}
      </button>

      <AnimatePresence>
        {!locked && open && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/12 z-50 overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <div className="p-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus-within:border-orange-300 focus-within:bg-white transition-colors">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search currency or country..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-full"
                  aria-label="Search currencies"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-slate-400 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
            <ul id={listId} role="listbox" className="max-h-56 overflow-y-auto py-1.5 hide-scrollbar">
              {filtered.map((c, i) => {
                const active = c.code === value || i === activeIndex;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={c.code === value}
                      onClick={() => choose(c.code)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 transition-colors text-left ${
                        active ? 'bg-orange-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-lg shrink-0"
                        aria-hidden="true"
                      >
                        {c.flag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-slate-900 text-sm font-medium">
                          {c.code} · {c.symbol}
                        </div>
                        <div className="text-slate-500 text-xs truncate">
                          {c.name} · {c.country}
                        </div>
                      </div>
                      {c.code === value && (
                        <Check size={15} className="text-orange-600 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-4 py-4 text-slate-500 text-sm text-center">
                  No currencies found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
