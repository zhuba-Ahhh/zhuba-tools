/**
 * @description 数字千分位分割
 * @param num
 * @returns
 */
export const commafy = (num: string | number) => {
  return num.toString().includes('.')
    ? num.toLocaleString()
    : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};
