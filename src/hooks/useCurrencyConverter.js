import { useMemo, useState, useCallback } from 'react';
import { exchangeRates, transferFees } from '../data/currencies';

/**
 * Demo currency converter. Always converts other currencies → USD.
 * Replace `exchangeRates` fetch with a live API without changing the component contract.
 */
export function useCurrencyConverter(initial = { amount: '10000', from: 'NGN' }) {
  const [amount, setAmount] = useState(initial.amount);
  const [fromCurrency, setFromCurrency] = useState(initial.from === 'USD' ? 'NGN' : initial.from);
  const toCurrency = 'USD';

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
  };
}
