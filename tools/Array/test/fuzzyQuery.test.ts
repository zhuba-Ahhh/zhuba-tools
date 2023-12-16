// fuzzyQuery.test.ts
import { describe, expect, it } from 'vitest';

import { fuzzyQuery } from '..';

describe('fuzzyQuery', () => {
  const testData: { name: string; age: number }[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
  ];

  it('searches by name', () => {
    const result = fuzzyQuery(testData, 'Ali');
    expect(result).toEqual([{ name: 'Alice', age: 30 }]);
  });

  it('searches by regular expression', () => {
    const result = fuzzyQuery(testData, /bo/i);
    expect(result).toEqual([{ name: 'Bob', age: 25 }]);
  });

  it('searches with non-default attribute', () => {
    const result = fuzzyQuery(testData, '3', 'age');
    expect(result).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 35 }
    ]);
  });

  it('returns empty array when no matches found', () => {
    const result = fuzzyQuery(testData, 'xyz');
    expect(result).toEqual([]);
  });
});
