/**
 *
 * @param callback 待执行回调函数
 * @param delay 防抖时间 ms
 * @param dep 依赖 []
 * @returns 处理后的函数
 */
export declare const useDebounce: (callback: () => void, delay?: number, dep?: any[]) => () => void;
