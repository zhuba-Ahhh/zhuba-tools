export const throttle = (callback: () => void, wait = 1000, immediate = false) => {
  let last = 0;
  let timer: number | null | undefined = null;

  return (...args: []) => {
    const now = +new Date();

    if (immediate && !timer) {
      callback.apply(this, args);
      immediate = false;
    }

    if (now - last > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      callback.apply(this, args);
    } else if (!timer && !immediate) {
      timer = setTimeout(
        () => {
          timer = null;
          last = +new Date();
          callback.apply(this, args);
        },
        wait - (now - last)
      );
    }
  };
};
