// timestampToTime.test.ts
import { describe, expect, it } from 'vitest';

import { timestampToTime } from '..';

describe('timestampToTime', () => {
  it('converts timestamp to default formatted string', () => {
    // 假设固定的时间戳
    const timestamp = new Date('2021-01-01T00:00:00.000Z').getTime();
    expect(timestampToTime(timestamp)).toBe('2021-01-01 00:00:00');
  });

  it('converts non-millisecond timestamp to string', () => {
    // 相同的时间，但不是毫秒级时间戳
    const timestamp = new Date('2021-01-01T00:00:00.000Z').getTime() / 1000;
    expect(timestampToTime(timestamp, false)).toBe('2021-01-01 00:00:00');
  });

  it('formats timestamp with custom format', () => {
    const timestamp = new Date('2021-01-01T00:00:00.000Z').getTime();
    expect(timestampToTime(timestamp, true, 'YYYY/MM/DD')).toBe('2021/01/01');
  });

  it('handles edge cases for months and days', () => {
    const timestamp = new Date('2021-11-21T12:34:56.000Z').getTime();
    expect(timestampToTime(timestamp)).toBe('2021-11-21 12:34:56');
  });
});
