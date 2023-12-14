import { describe, expect, it, vi } from 'vitest';

import { debounce } from '..';

describe('debounce', () => {
  it('should call the callback only once within the specified time', async () => {
    const callback = vi.fn();
    const debouncedFunction = debounce(callback, 1000);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    await new Promise((r) => setTimeout(r, 1100)); // 等待超过 1000 毫秒

    expect(callback).toHaveBeenCalledTimes(1); // 验证回调函数只被调用了一次
  });
});
