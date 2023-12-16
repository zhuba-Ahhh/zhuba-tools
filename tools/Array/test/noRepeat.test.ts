import { describe, expect, it } from 'vitest';

import { noRepeat } from '..';

describe('noRepeat function', () => {
  it('should remove duplicates from an array of numbers', () => {
    const numbers = [1, 2, 2, 3];
    const expected = [1, 2, 3];
    expect(noRepeat<number>(numbers)).toEqual(expected);
  });

  it('should remove duplicates from an array of strings', () => {
    const strings = ['a', 'b', 'b', 'c'];
    const expected = ['a', 'b', 'c'];
    expect(noRepeat<string>(strings)).toEqual(expected);
  });

  it('should handle empty array', () => {
    const empty: number[] = [];
    expect(noRepeat<number>(empty)).toEqual([]);
  });

  it('should handle null', () => {
    expect(noRepeat<null>(null)).toEqual([]);
  });

  it('should handle undefined', () => {
    expect(noRepeat<undefined>(undefined)).toEqual([]);
  });
});
