export enum OSType {
  IOS = 1,
  Android = 2,
  Windows = 3,
  MacOS = 4,
  Other = 5
}
/**
 * @description 获取操作系统类型
 * @returns 1: ios  2: android 3: 其它
 */
export const getOSType = (): OSType => {
  const userAgent = navigator.userAgent;
  const isAndroid = userAgent.includes('Android') || userAgent.includes('Linux');
  const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isWindows = userAgent.includes('Windows');
  const isMacOS = userAgent.includes('Macintosh');

  if (isIOS) {
    return OSType.IOS;
  }
  if (isAndroid) {
    return OSType.Android;
  }
  if (isWindows) {
    return OSType.Windows;
  }
  if (isMacOS) {
    return OSType.MacOS;
  }
  return OSType.Other;
};
