import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, ArrowRight, Clock, Shield, TrendingUp } from 'lucide-react';
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
            'radial-gradient(ellipse at 8% 12%, rgba(234,88,12,0.1), transparent 40%), radial-gradient(ellipse at 92% 18%, rgba(14,165,233,0.1), transparent 38%), radial-gradient(ellipse at 55% 100%, rgba(245,158,11,0.07), transparent 42%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

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

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14 items-start">
          {/* Interactive converter */}
          <motion.div
            className="relative rounded-3xl border border-slate-200/90 bg-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.28)] overflow-hidden"
            {...fadeUp(0.1)}
          >
            {/* Header band */}
            <div className="relative px-5 sm:px-7 pt-6 pb-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              <div
                className="absolute -top-16 -right-10 w-56 h-56 rounded-full blur-3xl opacity-50"
                style={{ background: 'radial-gradient(circle, #EA580C 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-20 left-10 w-48 h-48 rounded-full blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-1.5">
                    You send
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Transfer preview
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-amber-100/90 bg-white/8 border border-white/12 px-3 py-1.5 rounded-lg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-60" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-amber-300" />
                  </span>
                  Demo rates
                </span>
              </div>

              {/* Live corridor path */}
              <div className="relative mt-5 flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={fromCurrency}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/12 px-3.5 py-2.5 min-w-0"
                  >
                    <span className="text-xl leading-none" aria-hidden="true">
                      {from?.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm tracking-wide">
                        {fromCurrency}
                      </div>
                      <div className="text-white/45 text-[11px] truncate">{from?.name}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex-1 flex items-center min-w-[2.5rem]" aria-hidden="true">
                  <div className="h-px flex-1 bg-gradient-to-r from-white/25 via-orange-400/70 to-sky-400/60" />
                  <motion.span
                    className="mx-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(234,88,12,0.7)]"
                    animate={{ x: [0, 4, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="h-px flex-1 bg-gradient-to-r from-sky-400/60 to-white/20" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={toCurrency}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/12 px-3.5 py-2.5 min-w-0"
                  >
                    <span className="text-xl leading-none" aria-hidden="true">
                      {to?.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm tracking-wide">
                        {toCurrency}
                      </div>
                      <div className="text-white/45 text-[11px] truncate">{to?.name}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-1">
              {/* Amount + From */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 space-y-4">
                <div>
                  <label
                    htmlFor="send-amount"
                    className="block text-[11px] text-slate-500 mb-2.5 font-semibold uppercase tracking-[0.14em]"
                  >
                    Amount
                  </label>
                  <div className="flex items-baseline gap-2.5">
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

              {/* Swap control */}
              <div className="relative flex items-center justify-center py-1 z-10">
                <div className="absolute inset-x-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <motion.button
                  type="button"
                  onClick={swap}
                  className="relative z-10 w-11 h-11 rounded-full bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-600/25 border-[3px] border-white"
                  whileHover={{ rotate: 180, scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  aria-label="Swap currencies"
                >
                  <ArrowDownUp size={17} />
                </motion.button>
              </div>

              {/* Destination */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
                <CurrencySelector value={toCurrency} onChange={setToCurrency} label="To" />

                <div className="relative overflow-hidden rounded-2xl border border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-sky-50/60 p-5">
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-orange-400/10 blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 mb-2 font-semibold">
                      Recipient gets
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
                      <span aria-hidden="true">{to?.flag}</span> {to?.code} — {to?.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200/80 rounded-2xl overflow-hidden border border-slate-200 mt-4">
                {[
                  { label: 'Exchange Rate', value: `1 ${fromCurrency} = ${rate} ${toCurrency}` },
                  { label: 'Transfer Fee', value: `${from?.symbol}${formatMoney(fee)}` },
                  { label: 'Estimated Arrival', value: 'Within minutes', accent: true },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="bg-white px-4 py-3.5">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500 mb-1">
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
                className="group mt-4 flex w-full items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/25"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
              >
                Send Money Now
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </motion.a>

              <p className="pt-3 text-center text-xs text-slate-400 leading-relaxed">
                Demo conversion only — figures update as you change amount or corridor.
              </p>
            </div>
          </motion.div>

          {/* Supporting copy */}
          <div className="lg:pt-2 space-y-8">
            <motion.div {...fadeUp(0.16)}>
              <h3 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-slate-900 mb-4 font-display leading-tight tracking-tight">
                Visibility. Structure.
                <span className="block text-gradient mt-1">Control across borders.</span>
              </h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-md">
                Explore demo conversion flows across nSERVE corridor currencies. Swap this data
                layer for live FX rates when you connect a real market-data API.
              </p>
            </motion.div>

            <div className="space-y-0 border-t border-slate-200">
              {highlights.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="group flex gap-4 py-5 border-b border-slate-200"
                  {...fadeUp(0.22 + i * 0.07)}
                >
                  <div className="mt-0.5 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors duration-300">
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
          </div>
        </div>
      </div>
    </section>
  );
}
