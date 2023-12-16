/**
 *
 * @description 遍历树节点
 * @param data
 * @param callback
 * @param childrenName
 * @param depth
 * @param parent
 */
export declare const foreachTree: <T extends Record<string, any>>(data: T[], callback: (node: T, depth: number, parent?: T | undefined) => void, childrenName?: keyof T, depth?: number, parent?: T | undefined) => void;
