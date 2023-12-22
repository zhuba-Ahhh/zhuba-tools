/**
 * @description 解析url获取参数
 * @param url 链接
 * @returns 参数对象
 */
export const parseUrl = (url: string): Record<string, any> => {
  const queryStart = url.indexOf('?');
  const queryParams = new URLSearchParams(queryStart >= 0 ? url.substring(queryStart) : '');
  const obj: Record<string, any> = {};

  queryParams.forEach((value, key) => {
    obj[key] = /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : decodeURIComponent(value);
  });

  return obj;
};
