/**
 * @description 金额格式化
 * @param {number} number：要格式化的数字
 * @param {number} decimals：保留几位小数
 * @param {string} decPoint：小数点符号
 * @param {string} thousandsSep：千分位符号
 * @returns
 */
export declare const moneyFormat: (number: string, decimals?: number, decPoint?: string, thousandsSep?: string) => string;
