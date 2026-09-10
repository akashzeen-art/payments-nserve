import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, Clock, Shield, TrendingUp } from 'lucide-react';
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
  { icon: TrendingUp, title: 'Competitive Rates' },
  { icon: Clock, title: 'Fast Settlement' },
  { icon: Shield, title: 'Secure & Compliant' },
];

export default function CurrencyConverter() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    result,
    fee,
    rate,
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
            <div className="relative px-3.5 sm:px-4 py-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              <div
                className="absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle, #EA580C 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight">
                  Transfer preview
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-amber-100 bg-white/10 border border-white/15 px-2.5 py-1 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  Demo rates
                </span>
              </div>

              {/* Corridor strip */}
              <div className="relative mt-3 flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={fromCurrency}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-1 items-center gap-2 rounded-lg bg-white/10 border border-white/10 px-2.5 py-2 min-w-0"
                  >
                    <span className="text-lg leading-none" aria-hidden="true">
                      {from?.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm tracking-wide">
                        {fromCurrency}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <ArrowRight size={14} className="text-orange-300 shrink-0" aria-hidden="true" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={toCurrency}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-1 items-center gap-2 rounded-lg bg-white/10 border border-white/10 px-2.5 py-2 min-w-0"
                  >
                    <span className="text-lg leading-none" aria-hidden="true">
                      {to?.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm tracking-wide">
                        {toCurrency}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 space-y-0">
              {/* Send block */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="send-amount"
                    className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.14em]"
                  >
                    You send
                  </label>
                  <span className="text-[10px] text-slate-400 truncate">
                    {from?.flag} {from?.country}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-display text-lg sm:text-xl font-semibold shrink-0">
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
                    className="w-full bg-transparent text-slate-900 font-display text-xl sm:text-2xl font-bold outline-none placeholder:text-slate-300 caret-orange-600"
                    aria-label="Amount to send"
                  />
                </div>

                <CurrencySelector
                  value={fromCurrency}
                  onChange={setFromCurrency}
                  label="From"
                  exclude={['USD']}
                />
              </div>

              {/* Direction indicator — always other → USD */}
              <div className="relative flex items-center justify-center -my-0.5 py-0.5 z-10">
                <div className="absolute inset-x-10 h-px bg-slate-200" />
                <div
                  className="relative z-10 w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/25 border-[3px] border-white"
                  aria-hidden="true"
                >
                  <ArrowDown size={14} />
                </div>
              </div>

              {/* Receive block */}
              <div className="rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3 space-y-2.5">
                <CurrencySelector value={toCurrency} onChange={() => {}} label="To" locked />

                <div className="relative overflow-hidden rounded-lg border border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-sky-50/70 p-2.5 sm:p-3">
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3 mb-0.5">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
                        Recipient gets
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">
                        {to?.flag} {to?.country}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${result}-${toCurrency}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease }}
                        className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
                      >
                        {to?.symbol}
                        {formatMoney(result)}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {to?.code} — {to?.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200/80 rounded-lg overflow-hidden border border-slate-200 mt-2.5">
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
                  <div key={label} className="bg-white px-2.5 py-2.5">
                    <div className="text-[9px] uppercase tracking-[0.12em] text-slate-500 mb-0.5">
                      {label}
                    </div>
                    <div
                      className={`text-xs font-semibold leading-snug ${
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
                className="group mt-2.5 flex w-full items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
              >
                Send Money Now
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </motion.a>

              <p className="pt-2 text-center text-[11px] text-slate-400 leading-relaxed">
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
            </motion.div>

            <div className="space-y-0 border-t border-slate-200">
              {highlights.map(({ icon: Icon, title }, i) => (
                <motion.div
                  key={title}
                  className="group flex items-center gap-4 py-5 border-b border-slate-200"
                  {...fadeUp(0.22 + i * 0.07)}
                >
                  <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors duration-300 shadow-sm">
                    <Icon size={17} strokeWidth={1.85} />
                  </div>
                  <div className="text-slate-900 font-semibold font-display text-base sm:text-lg">
                    {title}
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
