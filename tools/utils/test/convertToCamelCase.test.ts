import { describe, expect, it } from 'vitest';

import { convertToCamelCase } from '..';

describe('convertToCamelCase', () => {
  it('converts simple object keys to camel case', () => {
    const obj = { first_name: 'John', last_name: 'Doe' };
    expect(convertToCamelCase(obj)).toEqual({ firstName: 'John', lastName: 'Doe' });
  });

  it('converts nested object keys to camel case', () => {
    const obj = { user_details: { first_name: 'John', last_name: 'Doe' } };
    expect(convertToCamelCase(obj)).toEqual({
      userDetails: { firstName: 'John', lastName: 'Doe' }
    });
  });

  it('returns non-object input as is', () => {
    expect(convertToCamelCase(null)).toBeNull();
    expect(convertToCamelCase(5)).toBe(5);
    expect(convertToCamelCase('string')).toBe('string');
  });
});
