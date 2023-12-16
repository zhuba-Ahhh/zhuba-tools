/**
 *
 * @param list 原数组
 * @param keyWord 值 查询的关键词/数组
 * @param attribute 键 数组需要检索属性/数组
 * @returns
 */
export declare const fuzzyQuery: <T extends Record<string, any>>(list: T[], keyWords: string | string[] | RegExp | RegExp[], attributes?: keyof T | (keyof T)[]) => T[];
