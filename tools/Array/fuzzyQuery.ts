/**
 *
 * @param list 原数组
 * @param keyWord 值 查询的关键词/数组
 * @param attribute 键 数组需要检索属性/数组
 * @returns
 */
export const fuzzyQuery = <T extends Record<string, any>>(
  list: T[],
  keyWords: string | string[] | RegExp | RegExp[],
  attributes: keyof T | (keyof T)[] = 'name'
): T[] => {
  const regexes = Array.isArray(keyWords)
    ? keyWords.map((kw) => new RegExp(kw))
    : [new RegExp(keyWords)];
  const attrs = Array.isArray(attributes) ? attributes : [attributes];
  const resultSet = new Set<T>();

  for (const item of list) {
    for (const attr of attrs) {
      for (const regex of regexes) {
        if (regex.test(String(item[attr]))) {
          resultSet.add(item);
          break;
        }
      }
    }
  }

  return Array.from(resultSet);
};
