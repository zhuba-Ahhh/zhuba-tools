/**
 * @description 获取url中的参数
 * @param url string
 * @returns
 */
export const getURLParameters = (url: string): Record<string, string> => {
  return (url.match(/([^?=&]+)(=([^&]*))/g) ?? []).reduce(
    (params: Record<string, string>, param: string) => {
      const [key, value] = param.split('=');
      params[key] = decodeURIComponent(value);
      return params;
    },
    {}
  );
};
