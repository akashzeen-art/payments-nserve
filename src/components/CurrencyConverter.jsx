import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownUp,
  ArrowRight,
  Clock,
  Shield,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import { currencies } from '../data/currencies';
import CurrencySelector from './CurrencySelector';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease },
});

function formatMoney(value) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return '0.00';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const highlights = [
  {
    icon: TrendingUp,
    title: 'Competitive Rates',
    desc: 'Mid-market rates with a small transparent fee. No markup surprises.',
  },
  {
    icon: Clock,
    title: 'Fast Settlement',
    desc: 'Most transfers settle within minutes. Priority corridors can be near-instant.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    desc: 'Bank-grade encryption with compliance controls designed for regulated markets.',
  },
];

const trustPoints = [
  'Transparent fees shown upfront',
  'Corridor-ready currency pairs',
  'Demo today — live rates when connected',
];

export default function CurrencyConverter() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    fee,
    rate,
    swap,
  } = useCurrencyConverter();

  const from = currencies.find((c) => c.code === fromCurrency);
  const to = currencies.find((c) => c.code === toCurrency);

  return (
    <section id="solutions" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 8% 12%, rgba(234,88,12,0.11), transparent 40%), radial-gradient(ellipse at 92% 18%, rgba(14,165,233,0.1), transparent 38%), radial-gradient(ellipse at 55% 100%, rgba(245,158,11,0.07), transparent 42%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/35 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-14 max-w-2xl">
          <motion.p
            className="text-orange-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            {...fadeUp(0)}
          >
            Payment Coordination
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-4 leading-[1.12] tracking-tight"
            {...fadeUp(0.06)}
          >
            Different currencies.{' '}
            <span className="text-gradient">One connected process.</span>
          </motion.h2>
          <motion.p className="text-slate-600 text-base sm:text-lg leading-relaxed" {...fadeUp(0.12)}>
            nSERVE simplifies the complexity behind every transaction by connecting people,
            information, processes and payment ecosystems across borders.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 xl:gap-14 items-start">
          {/* Converter instrument */}
          <motion.div
            className="relative rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-40px_rgba(15,23,42,0.32)] overflow-hidden"
            {...fadeUp(0.1)}
          >
            <div
              className="absolute inset-x-0 top-0 h-1 z-10"
              style={{
                background: 'linear-gradient(90deg, #EA580C, #F59E0B 45%, #0EA5E9)',
              }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="relative px-5 sm:px-7 pt-7 pb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              <div
                className="absolute -top-20 -right-12 w-64 h-64 rounded-full blur-3xl opacity-45"
                style={{ background: 'radial-gradient(circle, #EA580C 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 left-8 w-56 h-56 rounded-full blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-orange-300">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-1">
                      You send
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Transfer preview
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-amber-100 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-60" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-amber-300" />
                  </span>
                  Demo rates
                </span>
              </div>

              {/* Corridor strip */}
              <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-3.5">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={fromCurrency}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-1 items-center gap-2.5 rounded-xl bg-white/10 border border-white/10 px-3 py-2.5 min-w-0"
                    >
                      <span className="text-xl leading-none" aria-hidden="true">
                        {from?.flag}
                      </span>
                      <div className="min-w-0">
                        <div className="text-white font-semibold text-sm tracking-wide">
                          {fromCurrency}
                        </div>
                        <div className="text-white/40 text-[11px] truncate">{from?.name}</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="hidden sm:flex flex-[0.7] items-center min-w-[2rem]" aria-hidden="true">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-orange-400/80 to-sky-400/70" />
                    <motion.span
                      className="mx-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(234,88,12,0.8)]"
                      animate={{ x: [0, 6, 0], opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="h-px flex-1 bg-gradient-to-r from-sky-400/70 to-white/15" />
                  </div>

                  <div className="sm:hidden flex items-center justify-center shrink-0" aria-hidden="true">
                    <ArrowRight size={16} className="text-orange-300" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={toCurrency}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-1 items-center gap-2.5 rounded-xl bg-white/10 border border-white/10 px-3 py-2.5 min-w-0"
                    >
                      <span className="text-xl leading-none" aria-hidden="true">
                        {to?.flag}
                      </span>
                      <div className="min-w-0">
                        <div className="text-white font-semibold text-sm tracking-wide">
                          {toCurrency}
                        </div>
                        <div className="text-white/40 text-[11px] truncate">{to?.name}</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-0">
              {/* Send block */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 sm:p-5 space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="send-amount"
                    className="text-[11px] text-slate-500 font-semibold uppercase tracking-[0.14em]"
                  >
                    You send
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {from?.flag} {from?.country}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-baseline gap-2 min-w-0">
                    <span className="text-slate-400 font-display text-2xl sm:text-3xl font-semibold shrink-0">
                      {from?.symbol}
                    </span>
                    <input
                      id="send-amount"
                      type="number"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full bg-transparent text-slate-900 font-display text-3xl sm:text-4xl font-bold outline-none placeholder:text-slate-300 caret-orange-600"
                      aria-label="Amount to send"
                    />
                  </div>
                </div>

                <CurrencySelector value={fromCurrency} onChange={setFromCurrency} label="From" />
              </div>

              {/* Swap */}
              <div className="relative flex items-center justify-center -my-1 py-1 z-10">
                <div className="absolute inset-x-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <motion.button
                  type="button"
                  onClick={swap}
                  className="relative z-10 w-12 h-12 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 border-[3px] border-white"
                  whileHover={{ rotate: 180, scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  aria-label="Swap currencies"
                >
                  <ArrowDownUp size={18} />
                </motion.button>
              </div>

              {/* Receive block */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
                <CurrencySelector value={toCurrency} onChange={setToCurrency} label="To" />

                <div className="relative overflow-hidden rounded-2xl border border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-sky-50/70 p-5">
                  <div
                    className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-orange-400/15 blur-2xl"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -left-8 -bottom-10 w-28 h-28 rounded-full bg-sky-400/10 blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
                        Recipient gets
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {to?.flag} {to?.country}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${result}-${toCurrency}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease }}
                        className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
                      >
                        {to?.symbol}
                        {formatMoney(result)}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-sm text-slate-600 mt-2">
                      {to?.code} — {to?.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200/80 rounded-2xl overflow-hidden border border-slate-200 mt-5">
                {[
                  {
                    label: 'Exchange Rate',
                    value: `1 ${fromCurrency} = ${rate} ${toCurrency}`,
                  },
                  {
                    label: 'Transfer Fee',
                    value: `${from?.symbol}${formatMoney(fee)}`,
                  },
                  {
                    label: 'Estimated Arrival',
                    value: 'Within minutes',
                    accent: true,
                  },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="bg-white px-4 py-4">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500 mb-1.5">
                      {label}
                    </div>
                    <div
                      className={`text-sm font-semibold leading-snug ${
                        accent ? 'text-sky-600' : 'text-slate-900'
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <motion.a
                href="#cta"
                className="group mt-5 flex w-full items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/25"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
              >
                Send Money Now
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </motion.a>

              <p className="pt-3.5 text-center text-xs text-slate-400 leading-relaxed">
                Demo conversion only — figures update as you change amount or corridor.
              </p>
            </div>
          </motion.div>

          {/* Side narrative */}
          <div className="lg:pt-1 space-y-8">
            <motion.div {...fadeUp(0.16)}>
              <h3 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-slate-900 mb-4 font-display leading-tight tracking-tight">
                Visibility. Structure.
                <span className="block text-gradient mt-1">Control across borders.</span>
              </h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-md">
                Explore demo conversion flows across nSERVE corridor currencies. Connect a live
                market-data API when you are ready for production rates.
              </p>
            </motion.div>

            <motion.ul className="space-y-2.5" {...fadeUp(0.2)} aria-label="Transfer benefits">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 text-orange-600 shrink-0"
                    strokeWidth={2}
                  />
                  {point}
                </li>
              ))}
            </motion.ul>

            <div className="space-y-0 border-t border-slate-200">
              {highlights.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="group flex gap-4 py-5 border-b border-slate-200"
                  {...fadeUp(0.24 + i * 0.07)}
                >
                  <div className="mt-0.5 w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors duration-300 shadow-sm">
                    <Icon size={17} strokeWidth={1.85} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <div className="text-slate-900 font-semibold mb-1 font-display text-base sm:text-lg">
                      {title}
                    </div>
                    <div className="text-slate-600 text-sm leading-relaxed">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#map"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-500 transition-colors"
              {...fadeUp(0.45)}
            >
              View corridor map
              <ArrowRight size={15} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
