/**
 * @description 大小写转换
 * @param str 输入字符串
 * @param type 转换类型 1 全大写 2 全小写 3 首字母大写
 * @returns
 */
export const turnCase = (str: string, type = 1): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  if (str.length === 0) {
    return str;
  }

  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    default:
      return str;
  }
};
