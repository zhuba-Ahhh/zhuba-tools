import { describe, expect, it } from 'vitest';

import { isEqual } from '../isEqual'; // 确保路径正确

describe('isEqual function', () => {
  it('should return true for identical objects', () => {
    const objA = { foo: 'bar', baz: 123 };
    const objB = { foo: 'bar', baz: 123 };
    expect(isEqual(objA, objB)).toBe(true);
  });

  it('should return false for different objects', () => {
    const objA = { foo: 'bar' };
    const objB = { foo: 'baz' };
    expect(isEqual(objA, objB)).toBe(false);
  });

  it('should return true for identical arrays', () => {
    const arrA = [1, 2, 3];
    const arrB = [1, 2, 3];
    expect(isEqual(arrA, arrB)).toBe(true);
  });

  it('should return false for different arrays', () => {
    const arrA = [1, 2, 3];
    const arrB = [1, 2, 4];
    expect(isEqual(arrA, arrB)).toBe(false);
  });

  it('should return true for equal primitives', () => {
    expect(isEqual(123, 123)).toBe(true);
  });

  it('should return false for different primitives', () => {
    expect(isEqual('foo', 'bar')).toBe(false);
  });

  it('should return true for null and undefined', () => {
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for different types', () => {
    expect(isEqual('123', 123)).toBe(false);
  });

  it('should handle nested objects and arrays', () => {
    const objA = { foo: [1, 2, { bar: 'baz' }], baz: null };
    const objB = { foo: [1, 2, { bar: 'baz' }], baz: null };
    expect(isEqual(objA, objB)).toBe(true);
  });

  // 添加更多的测试用例以覆盖不同的场景
});
