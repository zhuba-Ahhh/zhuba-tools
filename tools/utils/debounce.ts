export const debounce = (callback: (...args: any[]) => void, wait = 1000, immediate = false) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: []) => {
    const later = () => {
      timer = null;
      if (!immediate) {
        callback(...args);
      }
    };

    const callNow = immediate && !timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(later, wait);

    if (callNow) {
      callback(...args);
    }
  };
};
