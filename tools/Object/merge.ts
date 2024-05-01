/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { copy } from './copy';
import { isObject } from './isObject';

export function merge<T extends object>(target: T, source: T): T {
  if (!isObject(target)) {
    return source;
  }
  if (!isObject(source)) {
    return target;
  }
  const targetObject = copy(target);
  const sourceObject = copy(source);
  Object.keys(sourceObject).forEach((key) => {
    const targetValue = targetObject[key];
    const sourceValue = sourceObject[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      targetObject[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      targetObject[key] = merge(targetValue, sourceValue);
    } else {
      targetObject[key] = sourceValue ?? targetObject[key];
    }
  });
  return targetObject;
}
