import React, { useState, useEffect } from 'react';
import { normalizeDecimalString, parseLocaleNumber } from '../../utils/numberInput';

interface DecimalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number | '' | string;
  onValueChange: (val: number | '') => void;
  allowNegative?: boolean;
  allowDecimal?: boolean;
}

export const DecimalInput: React.FC<DecimalInputProps> = ({
  value,
  onValueChange,
  allowNegative = false,
  allowDecimal = true,
  className = '',
  onBlur,
  ...rest
}) => {
  const [text, setText] = useState<string>(() => (value === '' || value === undefined ? '' : String(value)));

  // Sync external updates (e.g., Reset button or range slider) without clobbering active typing like "6." or ".5"
  useEffect(() => {
    const externalNum = typeof value === 'number' ? value : parseLocaleNumber(value);
    const localNum = parseLocaleNumber(text);

    if (value === '' && text !== '' && localNum !== null) {
      setText('');
    } else if (externalNum !== null && externalNum !== localNum) {
      setText(String(externalNum));
    } else if (value === '' && (text === '-' || text === '.')) {
      // Keep partial typing untouched
    } else if (typeof value === 'string' && value === '' && text !== '' && !text.endsWith('.')) {
      setText('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeDecimalString(e.target.value, { allowNegative, allowDecimal });
    setText(normalized);

    const parsed = parseLocaleNumber(normalized);
    if (parsed === null) {
      onValueChange('');
    } else {
      onValueChange(parsed);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parsed = parseLocaleNumber(text);
    if (parsed === null) {
      setText('');
    } else {
      setText(String(parsed));
    }
    if (onBlur) onBlur(e);
  };

  return (
    <input
      {...rest}
      type="text"
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      lang="en"
      dir="ltr"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  );
};
