/**
 * @@description 时间戳转换为时间
 * @param timestamp
 * @param isMs
 * @returns
 */
export const timestampToTime = (
  timestamp: number = Date.now(),
  isMs = true,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  const date = new Date(isMs ? timestamp : timestamp * 1000);

  // 使用 UTC 方法获取日期和时间
  const pad = (num: number): string => (num < 10 ? '0' + num : String(num));
  return format
    .replace('YYYY', String(date.getUTCFullYear()))
    .replace('MM', pad(date.getUTCMonth() + 1))
    .replace('DD', pad(date.getUTCDate()))
    .replace('HH', pad(date.getUTCHours()))
    .replace('mm', pad(date.getUTCMinutes()))
    .replace('ss', pad(date.getUTCSeconds()));
};
