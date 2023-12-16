/**
 *
 * @description 遍历树节点
 * @param data
 * @param callback
 * @param childrenName
 * @param depth
 * @param parent
 */
export const foreachTree = <T extends Record<string, any>>(
  data: T[],
  callback: (node: T, depth: number, parent?: T) => void,
  childrenName: keyof T = 'children',
  depth = 0,
  parent?: T
) => {
  for (const item of data) {
    callback(item, depth, parent);
    if (item[childrenName] && Array.isArray(item[childrenName])) {
      foreachTree(item[childrenName] as T[], callback, childrenName, depth + 1, item);
    }
  }
};
