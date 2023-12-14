import { describe, expect, it } from 'vitest';

import { typeOf } from '..';

describe('typeOf', () => {
  it('should return "string" for a string value', () => {
    expect(typeOf('zhuba')).toBe('string');
  });

  it('should return "array" for an array', () => {
    expect(typeOf([])).toBe('array');
  });

  it('should return "date" for a Date object', () => {
    expect(typeOf(new Date())).toBe('date');
  });

  it('should return "null" for null', () => {
    expect(typeOf(null)).toBe('null');
  });

  it('should return "boolean" for a boolean value', () => {
    expect(typeOf(true)).toBe('boolean');
  });

  it('should return "function" for a function', () => {
    expect(typeOf(() => void 0)).toBe('function');
  });

  it('should return "number" for a number value', () => {
    expect(typeOf(123)).toBe('number');
  });

  it('should return "object" for an object', () => {
    expect(typeOf({})).toBe('object');
  });

  it('should return "null" for null', () => {
    expect(typeOf(null)).toBe('null');
  });

  it('should return "undefined" for undefined', () => {
    expect(typeOf(undefined)).toBe('undefined');
  });

  it('should return "regexp" for a regular expression', () => {
    expect(typeOf(/test/)).toBe('regexp');
  });
});
