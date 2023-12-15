/**
 * @description 获取url中的参数
 * @param url string
 * @returns
 */
export const getURLParameters = (url: string): Record<string, any> | undefined => {
  return url
    .match(/([^?=&]+)(=([^&]*))/g)
    ?.reduce(
      (a: Record<string, any>, v: string) => (
        (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
      ),
      {}
    );
};
