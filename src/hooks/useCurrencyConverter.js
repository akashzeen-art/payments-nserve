import { useMemo, useState, useCallback, useEffect } from 'react';
import { exchangeRates as fallbackRates, transferFees } from '../data/currencies';

const RATES_URL = 'https://open.er-api.com/v6/latest/USD';
const CACHE_KEY = 'nserve_fx_usd_rates_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.rates || !parsed?.fetchedAt) return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed.rates;
  } catch {
    return null;
  }
}

function writeCache(rates) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ rates, fetchedAt: Date.now() }),
    );
  } catch {
    // ignore quota / private mode
  }
}

/**
 * Always converts other currencies → USD.
 * Live mid-market rates from open.er-api.com (no API key), with local fallback.
 */
export function useCurrencyConverter(initial = { amount: '10000', from: 'NGN' }) {
  const [amount, setAmount] = useState(initial.amount);
  const [fromCurrency, setFromCurrency] = useState(initial.from === 'USD' ? 'NGN' : initial.from);
  const toCurrency = 'USD';
  const [rates, setRates] = useState(() => ({ ...fallbackRates, ...(readCache() || {}) }));
  const [ratesStatus, setRatesStatus] = useState(() => (readCache() ? 'live' : 'loading'));

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setRates({ ...fallbackRates, ...cached });
      setRatesStatus('live');
    }

    async function loadRates() {
      try {
        const res = await fetch(RATES_URL);
        if (!res.ok) throw new Error(`FX API ${res.status}`);
        const data = await res.json();
        if (data?.result !== 'success' || !data?.rates) {
          throw new Error('FX API payload invalid');
        }
        if (cancelled) return;
        const next = { ...fallbackRates, ...data.rates, USD: 1 };
        writeCache(data.rates);
        setRates(next);
        setRatesStatus('live');
      } catch {
        if (cancelled) return;
        setRates((prev) => ({ ...fallbackRates, ...prev }));
        setRatesStatus((prev) => (prev === 'live' ? 'live' : 'fallback'));
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const convert = useCallback(
    (amt, from, to) => {
      const n = Math.max(parseFloat(amt) || 0, 0);
      const fromRate = rates[from] || fallbackRates[from] || 1;
      const toRate = rates[to] || fallbackRates[to] || 1;
      const result = (n / fromRate) * toRate;
      const fee = Math.min(Math.max(n * transferFees.base, transferFees.min), transferFees.max);
      const rate = toRate / fromRate;
      return {
        result: result.toFixed(2),
        fee: fee.toFixed(2),
        rate: rate.toFixed(4),
        netAmount: Math.max(n - fee, 0).toFixed(2),
      };
    },
    [rates],
  );

  const setFromCurrencySafe = useCallback((code) => {
    if (code === 'USD') return;
    setFromCurrency(code);
  }, []);

  const { result, fee, rate, netAmount } = useMemo(
    () => convert(amount, fromCurrency, toCurrency),
    [amount, fromCurrency, toCurrency, convert],
  );

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency: setFromCurrencySafe,
    toCurrency,
    setToCurrency: () => {},
    result,
    fee,
    rate,
    netAmount,
    swap: () => {},
    ratesStatus,
  };
}
