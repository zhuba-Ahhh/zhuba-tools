type CleanupFunction = (text: string) => string;
interface CopyTableDataOptions {
    cleanupFunction?: CleanupFunction;
}
/**
 * @description 去除copy表格数据等情形带来的空格
 * @param options // options?.cleanupFunction 对粘贴数据的处理函数,默认是去除空格
 */
export declare const copyTableDataListener: (options?: CopyTableDataOptions) => (() => void);
export {};
