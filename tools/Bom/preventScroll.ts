/**
 * 功能描述：一些业务场景，如弹框出现时，需要禁止页面滚动，这是兼容安卓和 iOS 禁止页面滚动的解决方案
 */

let scrollTop = 0;

export const preventScroll = () => {
  // 存储当前滚动位置
  scrollTop = window.scrollY;

  // 将可滚动区域固定定位，可滚动区域高度为 0 后就不能滚动了
  const bodyStyle = document.body.style;
  bodyStyle.overflowY = 'hidden';
  bodyStyle.position = 'fixed';
  bodyStyle.width = '100%';
  bodyStyle.top = -scrollTop + 'px';
};

export const recoverScroll = () => {
  const bodyStyle = document.body.style;
  bodyStyle.overflowY = 'auto';
  bodyStyle.position = 'static';

  window.scrollTo(0, scrollTop);
};
