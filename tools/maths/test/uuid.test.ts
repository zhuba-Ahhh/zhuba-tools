import { describe, expect, it } from 'vitest';

import { uuid } from '..';

describe('uuid', () => {
  it('should return a string with the default length plus prefix length', () => {
    expect(uuid().length).toBe(6 + 2); // 默认长度为 6，前缀 'u_' 长度为 2
  });

  it('should start with the specified prefix', () => {
    const prefix = 'test_';
    const result = uuid(6, prefix);
    expect(result.startsWith(prefix)).toBe(true);
  });

  it('should return a string with the specified length plus prefix length', () => {
    const length = 10;
    expect(uuid(length).length).toBe(length + 2); // 指定长度为 10，前缀 'u_' 长度为 2
  });

  it('should return different values on subsequent calls', () => {
    const firstCall = uuid();
    const secondCall = uuid();
    expect(firstCall).not.toBe(secondCall);
  });
});
