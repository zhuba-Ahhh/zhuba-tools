/**
 * @description: 求和函数
 * @param a number
 * @param b number
 * @return {number}
 */
export function stSum(a: number, b: number): number {
  if (typeof a !== "number") return a;
  if (typeof b !== "number") return b;
  return a + b;
}
