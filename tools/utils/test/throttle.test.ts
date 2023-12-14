import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { throttle } from '..';

describe('throttle', () => {
  // 在所有测试开始之前设置假定时器
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it('should call the callback at most once per wait period', () => {
    const callback = vi.fn();
    const throttledFunction = throttle(callback, 1000);

    throttledFunction();
    expect(callback).toHaveBeenCalledTimes(1);

    // 快进时间
    vi.advanceTimersByTime(500);
    throttledFunction();
    expect(callback).toHaveBeenCalledTimes(1); // 回调不应再次被调用

    vi.advanceTimersByTime(500);
    throttledFunction();
    expect(callback).toHaveBeenCalledTimes(2); // 现在应该被调用
  });

  // 在所有测试结束后清理假定时器
  afterAll(() => {
    vi.restoreAllMocks();
  });
});
