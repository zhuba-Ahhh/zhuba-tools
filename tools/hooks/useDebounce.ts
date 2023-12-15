import { useCallback, useEffect, useRef } from 'react';

/**
 *
 * @param callback 待执行回调函数
 * @param delay 防抖时间 ms
 * @param dep 依赖 []
 * @returns 处理后的函数
 */
export const useDebounce = (callback: () => void, delay = 1000, dep: any[] = []) => {
  const { current } = useRef({
    callback,
    timer: null as NodeJS.Timeout | null
  });
  useEffect(
    function () {
      current.callback = callback;
    },
    [callback]
  );

  return useCallback(function f(...args: Parameters<typeof callback>) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.callback(...args);
    }, delay);
  }, dep);
};
