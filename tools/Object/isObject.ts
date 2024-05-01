export function isObject(val: any) {
  return Object.prototype.toString.call(val) === '[object Object]';
}
