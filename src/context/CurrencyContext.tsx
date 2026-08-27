import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CurrencyCode, CurrencySymbol, CURRENCY_SYMBOLS } from '../types';

export interface CurrencyItem {
  code: CurrencyCode;
  symbol: CurrencySymbol;
  name: string;
  label: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: CurrencyItem[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', label: 'USD — US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', label: 'EUR — Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', label: 'GBP — British Pound', flag: '🇬🇧' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', label: 'CAD — Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', label: 'AUD — Australian Dollar', flag: '🇦🇺' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', label: 'JPY — Japanese Yen', flag: '🇯🇵' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', label: 'INR — Indian Rupee', flag: '🇮🇳' }
];

// Fallback baseline parity exchange rates (relative to 1 USD)
const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 155.0,
  INR: 83.5
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencySymbol: CurrencySymbol;
  currentCurrencyItem: CurrencyItem;
  rates: Record<string, number>;
  isLoadingRates: boolean;
  convert: (amount: number, from: CurrencyCode, to: CurrencyCode) => number;
  format: (amount: number, customCurrency?: CurrencyCode, maxDigits?: number) => string;
  lastUpdated: string | null;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = 'calculio_selected_currency';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('calchub_selected_currency');
      if (stored && SUPPORTED_CURRENCIES.some(c => c.code === stored)) {
        return stored as CurrencyCode;
      }
    } catch {
      // ignore storage errors
    }
    return 'USD';
  });

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Set currency and persist to localStorage
  const setCurrency = useCallback((code: CurrencyCode) => {
    if (SUPPORTED_CURRENCIES.some(c => c.code === code)) {
      setCurrencyState(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch (e) {
        console.warn('Could not save currency to localStorage', e);
      }
    }
  }, []);

  // Fetch reliable live exchange rates
  const fetchLiveRates = useCallback(async () => {
    setIsLoadingRates(true);
    try {
      // Primary: open.er-api.com (Reliable open exchange rate feed)
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && typeof data.rates.EUR === 'number') {
          setRates({
            USD: 1.0,
            EUR: data.rates.EUR,
            GBP: data.rates.GBP || FALLBACK_RATES.GBP,
            CAD: data.rates.CAD || FALLBACK_RATES.CAD,
            AUD: data.rates.AUD || FALLBACK_RATES.AUD,
            JPY: data.rates.JPY || FALLBACK_RATES.JPY,
            INR: data.rates.INR || FALLBACK_RATES.INR,
            ...data.rates
          });
          setLastUpdated(data.time_last_update_utc || new Date().toISOString());
          setIsLoadingRates(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Primary exchange rates fetch failed, trying secondary fallback', err);
    }

    try {
      // Secondary fallback: Frankfurter API (European Central Bank data)
      const res = await fetch('https://api.frankfurter.app/latest?from=USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && typeof data.rates.EUR === 'number') {
          setRates({
            USD: 1.0,
            EUR: data.rates.EUR,
            GBP: data.rates.GBP || FALLBACK_RATES.GBP,
            CAD: data.rates.CAD || FALLBACK_RATES.CAD,
            AUD: data.rates.AUD || FALLBACK_RATES.AUD,
            JPY: data.rates.JPY || FALLBACK_RATES.JPY,
            INR: data.rates.INR || FALLBACK_RATES.INR,
            ...data.rates
          });
          setLastUpdated(data.date || new Date().toISOString());
          setIsLoadingRates(false);
          return;
        }
      }
    } catch (err2) {
      console.warn('Secondary exchange rates fetch failed, keeping fallback benchmark rates', err2);
    }

    setIsLoadingRates(false);
  }, []);

  useEffect(() => {
    fetchLiveRates();
  }, [fetchLiveRates]);

  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
  const currentCurrencyItem = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];

  // Accurate currency conversion function
  const convert = useCallback((amount: number, from: CurrencyCode, to: CurrencyCode): number => {
    if (isNaN(amount) || !isFinite(amount)) return 0;
    if (from === to) return amount;
    
    const rateFrom = rates[from] || FALLBACK_RATES[from] || 1;
    const rateTo = rates[to] || FALLBACK_RATES[to] || 1;
    
    // Amount in USD = amount / rateFrom
    // Amount in Target = (amount / rateFrom) * rateTo
    const inUsd = amount / rateFrom;
    return inUsd * rateTo;
  }, [rates]);

  // Format currency with symbol
  const format = useCallback((amount: number, customCurrency?: CurrencyCode, maxDigits = 2): string => {
    const code = customCurrency || currency;
    const symbol = CURRENCY_SYMBOLS[code] || '$';
    if (isNaN(amount) || !isFinite(amount)) return `${symbol}0.00`;
    
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: maxDigits > 0 ? 2 : 0,
      maximumFractionDigits: maxDigits
    })}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencySymbol,
        currentCurrencyItem,
        rates,
        isLoadingRates,
        convert,
        format,
        lastUpdated,
        refreshRates: fetchLiveRates
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
