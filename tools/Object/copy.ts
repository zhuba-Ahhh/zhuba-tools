/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { isObject } from './isObject';

export const copy = (target: Record<string, any>, hash = new WeakMap()) => {
  if (!isObject(target)) {
    throw TypeError('arguments must be Object');
  }
  if (hash.has(target)) {
    return hash.get(target);
  }
  const ret: Record<string, any> = {};
  for (const key of Object.keys(target)) {
    const val = target[key];
    if (typeof val !== 'object' || val === null) {
      ret[key] = val;
    } else if (Array.isArray(val)) {
      ret[key] = [...val];
    } else if (val instanceof Set) {
      ret[key] = new Set([...val]);
    } else if (val instanceof Map) {
      ret[key] = new Map([...val]);
    } else {
      hash.set(val, val);
      ret[key] = copy(val, hash);
    }
  }
  return ret;
};
