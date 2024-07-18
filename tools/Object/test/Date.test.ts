import { describe, expect, it } from 'vitest';
import { chineseWorkday } from '../Date';

describe('Date tests', () => {
  it('should pass', () => {
    const { isWorkday, isHoliday, getFestival } = chineseWorkday;
    expect(isHoliday('2022-10-01')).toBeTruthy();
    expect(!isWorkday('2022-10-01')).toBeTruthy();
    expect(getFestival('2022-10-01')).toBe('国庆节');
  });
});
