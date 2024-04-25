export const isEqual = (a: unknown, b: unknown): boolean => {
  // 如果a和b是同一个引用，直接返回true
  if (a === b) {
    return true;
  }

  // 确定a和b的类型
  const typeA = typeof a;
  const typeB = typeof b;

  // 如果a和b的类型不同，返回false
  if (typeA !== typeB) {
    return false;
  }

  // 如果a和b是基本数据类型或null，直接比较值
  if (typeA !== 'object' || a === null || b === null) {
    return a === b;
  }

  // a和b都是对象或数组，进行深度比较
  if (Array.isArray(a)) {
    // 如果a和b都是数组，比较数组元素
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // a和b都是普通对象，比较键值对
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  // 如果对象的键数量不同，返回false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 遍历所有键并比较对应的值
  for (const key of keysA) {
    if (
      !keysB.includes(key) ||
      !isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    ) {
      return false;
    }
  }

  return true;
};
