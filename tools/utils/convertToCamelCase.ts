type CamelCase<S extends string> = S extends `${infer P}_${infer Q}${infer R}`
  ? `${P}${Capitalize<Q>}${CamelCase<R>}`
  : S;

type ConvertToCamelCase<T> = T extends object
  ? {
      [K in keyof T as CamelCase<K & string>]: ConvertToCamelCase<T[K]>;
    }
  : T;

export const convertToCamelCase = <T extends object>(obj: T | null): ConvertToCamelCase<T> => {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj as ConvertToCamelCase<T>;
  }

  const newObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/_(\w)/g, function (_, p1: string) {
        return p1.toUpperCase();
      });
      const value = obj[key];

      newObj[newKey] =
        typeof value === 'object' && value !== null ? convertToCamelCase(value) : value;
    }
  }

  return newObj as ConvertToCamelCase<T>;
};
