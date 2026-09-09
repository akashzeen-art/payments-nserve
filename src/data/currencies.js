export const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States / Zimbabwe', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'Eurozone', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', country: 'Iraq', flag: '🇮🇶' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', country: 'Iran', flag: '🇮🇷' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س', country: 'Sudan', flag: '🇸🇩' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', country: 'Zambia', flag: '🇿🇲' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', country: 'Myanmar', flag: '🇲🇲' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore', flag: '🇸🇬' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', country: 'Switzerland', flag: '🇨🇭' },
];

/** Mock mid-market rates vs USD. Replace with a live rates API later. */
export const exchangeRates = {
  USD: 1,
  EUR: 0.845,
  GBP: 0.7892,
  IQD: 1310,
  IRR: 42000,
  NGN: 1550,
  SDG: 600,
  ZMW: 27.2,
  BDT: 110,
  MMK: 2100,
  AED: 3.6725,
  INR: 83.42,
  SGD: 1.3421,
  CHF: 0.8923,
};

export const transferFees = { base: 0.00125, min: 2.5, max: 50 };
