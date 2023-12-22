// 参数序列化
export const argumentsSerializate = (obj: Record<string, number | string | boolean>) => {
  return Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      const encodedValue =
        typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
          ? encodeURIComponent(value.toString())
          : encodeURIComponent(JSON.stringify(value));
      return `${encodeURIComponent(key)}=${encodedValue}`;
    })
    .join('&');
};
