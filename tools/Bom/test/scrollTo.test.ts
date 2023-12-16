import { describe, expect, it, vi } from 'vitest';

import { scrollTo } from '..';

describe('scrollTo', () => {
  it('calls window.scrollTo and window.requestAnimationFrame to top', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => void 0);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 16));

    // 模拟页面有一定的滚动高度
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    document.documentElement.scrollTop = 100;

    scrollTo();

    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('calls window.scrollTo and window.requestAnimationFrame to specific position', () => {
    const targetPosition = 50;
    const speed = 10;

    vi.spyOn(window, 'scrollTo').mockImplementation(() => void 0);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 16));

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    document.documentElement.scrollTop = 100;

    scrollTo(targetPosition, speed);

    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });
});
