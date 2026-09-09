import { useMemo, useState, useCallback } from 'react';
import { exchangeRates, transferFees } from '../data/currencies';

/**
 * Demo FX converter. Replace `exchangeRates` fetch with a live API
 * (e.g. getRates()) without changing the component contract.
 */
export function useCurrencyConverter(initial = { amount: '10000', from: 'USD', to: 'NGN' }) {
  const [amount, setAmount] = useState(initial.amount);
  const [fromCurrency, setFromCurrency] = useState(initial.from);
  const [toCurrency, setToCurrency] = useState(initial.to);

  const convert = useCallback((amt, from, to) => {
    const n = Math.max(parseFloat(amt) || 0, 0);
    const fromRate = exchangeRates[from] || 1;
    const toRate = exchangeRates[to] || 1;
    const result = (n / fromRate) * toRate;
    const fee = Math.min(Math.max(n * transferFees.base, transferFees.min), transferFees.max);
    const rate = toRate / fromRate;
    return {
      result: result.toFixed(2),
      fee: fee.toFixed(2),
      rate: rate.toFixed(4),
      netAmount: Math.max(n - fee, 0).toFixed(2),
    };
  }, []);

  const swap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const { result, fee, rate, netAmount } = useMemo(
    () => convert(amount, fromCurrency, toCurrency),
    [amount, fromCurrency, toCurrency, convert],
  );

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    fee,
    rate,
    netAmount,
    swap,
  };
}
