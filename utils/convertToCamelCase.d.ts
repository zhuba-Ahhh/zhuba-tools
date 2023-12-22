type CamelCase<S extends string> = S extends `${infer P}_${infer Q}${infer R}` ? `${P}${Capitalize<Q>}${CamelCase<R>}` : S;
type ConvertToCamelCase<T> = T extends object ? {
    [K in keyof T as CamelCase<K & string>]: ConvertToCamelCase<T[K]>;
} : T;
export declare const convertToCamelCase: <T extends object>(obj: T) => ConvertToCamelCase<T>;
export {};
