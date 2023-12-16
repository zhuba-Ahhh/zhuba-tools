export declare enum OSType {
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
export declare const getOSType: () => OSType;
