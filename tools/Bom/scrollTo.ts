/**
 * @description 滚动到浏览器底部
 * @param target 到哪
 * @param speed 速度 每次滚动几分之一
 */
export const scrollTo = (target = 0, speed = 8) => {
  // 如果目标位置为 -1，则滚动到底部
  const targetPosition =
    target === -1 ? document.documentElement.scrollHeight - window.innerHeight : target;
  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

  if (
    (target === -1 || scrollPosition < targetPosition) &&
    scrollPosition < document.documentElement.scrollHeight - window.innerHeight
  ) {
    window.requestAnimationFrame(() => {
      scrollTo(target, speed);
    });
    window.scrollTo(0, scrollPosition + (targetPosition - scrollPosition) / speed);
  } else if (scrollPosition > targetPosition) {
    window.requestAnimationFrame(() => {
      scrollTo(target, speed);
    });
    window.scrollTo(0, scrollPosition - (scrollPosition - targetPosition) / speed);
  }
};
