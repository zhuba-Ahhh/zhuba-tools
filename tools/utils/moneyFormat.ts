/**
 * @description 金额格式化
 * @param {number} number：要格式化的数字
 * @param {number} decimals：保留几位小数
 * @param {string} decPoint：小数点符号
 * @param {string} thousandsSep：千分位符号
 * @returns
 */
export const moneyFormat = (
  number: string,
  decimals = 2,
  decPoint = '.',
  thousandsSep = ','
): string => {
  // 解析并修正数值
  const n = Number.parseFloat(number);
  if (!Number.isFinite(n)) {
    return '0';
  }

  // 修正小数点位数
  const fixedNum = n.toFixed(decimals);

  // 分割整数和小数部分
  const [intPart, decimalPart] = fixedNum.split('.'); // 使用 const

  // 格式化整数部分
  const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

  // 拼接整数和小数部分
  return decimalPart ? [formattedIntPart, decimalPart].join(decPoint) : formattedIntPart;
};
