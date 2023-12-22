import { describe, expect, it } from 'vitest';

import { parseUrl } from '..'; // 引入您的函数

describe('parseUrl', () => {
  it('should correctly parse query parameters', () => {
    const url = 'http://example.com?page=1&size=10&keyword=Vitest';
    const result = parseUrl(url);

    expect(result).toEqual({
      page: 1,
      size: 10,
      keyword: 'Vitest'
    });
  });

  it('should handle URLs without query parameters', () => {
    const url = 'http://example.com';
    const result = parseUrl(url);

    expect(result).toEqual({});
  });
});
