export const debounce = (callback: () => void, wait = 1000, immediate = false) => {
  let timer: number | null | undefined = null;

  return (...args: []) => {
    const later = () => {
      timer = null;
      if (!immediate) {
        callback.apply(this, args);
      }
    };

    const callNow = immediate && !timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(later, wait);

    if (callNow) {
      callback.apply(this, args);
    }
  };
};
