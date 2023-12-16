import { describe, expect, it } from 'vitest';

import { moneyFormat } from '..';

describe('moneyFormat', () => {
  it('formats number with default settings', () => {
    expect(moneyFormat('1234.567')).toBe('1,234.57');
  });

  it('handles large numbers', () => {
    expect(moneyFormat('123456789.12345')).toBe('123,456,789.12');
  });

  it('handles small numbers', () => {
    expect(moneyFormat('0.123')).toBe('0.12');
  });

  it('handles negative numbers', () => {
    expect(moneyFormat('-1234.567')).toBe('-1,234.57');
  });

  it('formats number with custom decimal places', () => {
    expect(moneyFormat('1234.567', 3)).toBe('1,234.567');
  });

  it('formats number with no decimals', () => {
    expect(moneyFormat('1234', 0)).toBe('1,234');
  });

  it('formats number with custom decimal point and thousands separator', () => {
    expect(moneyFormat('1234.567', 2, ',', '.')).toBe('1.234,57');
  });

  it('returns "0" for non-numeric input', () => {
    expect(moneyFormat('abc')).toBe('0');
  });
});
