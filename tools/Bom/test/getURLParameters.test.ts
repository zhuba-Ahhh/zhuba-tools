import { describe, expect, it } from 'vitest';

import { getURLParameters } from '..';

describe('getURLParameters', () => {
  it('parses parameters from a URL', () => {
    const url = 'http://example.com?page=1&size=10&keyword=Vitest';
    expect(getURLParameters(url)).toEqual({
      page: '1',
      size: '10',
      keyword: 'Vitest'
    });
  });

  it('handles URLs without parameters', () => {
    const url = 'http://example.com';
    expect(getURLParameters(url)).toEqual({});
  });

  it('decodes URL encoded parameters', () => {
    const url = 'http://example.com?name=John%20Doe&city=New%20York';
    expect(getURLParameters(url)).toEqual({
      name: 'John Doe',
      city: 'New York'
    });
  });
});
