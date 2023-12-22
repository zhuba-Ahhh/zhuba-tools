/**
 * 功能描述：一些业务场景，如弹框出现时，需要禁止页面滚动，这是兼容安卓和 iOS 禁止页面滚动的解决方案
 */

export const createScrollControl = () => {
  let scrollTop = 0;
  let originalStyle: CSSStyleDeclaration | null = null;

  const setBodyStyle = (style: Partial<CSSStyleDeclaration>) => {
    const bodyStyle = document.body.style;
    Object.assign(bodyStyle, style);
  };

  // 阻止滚动
  const preventScroll = () => {
    scrollTop = window.scrollY;
    originalStyle = document.body.style.cssText ? { ...document.body.style } : null;

    setBodyStyle({
      overflowY: 'hidden',
      position: 'fixed',
      width: '100%',
      top: -scrollTop + 'px'
    });
  };

  // 恢复滚动
  const recoverScroll = () => {
    if (originalStyle !== null) {
      setBodyStyle(originalStyle);
    } else {
      setBodyStyle({
        overflowY: '',
        position: '',
        width: '',
        top: ''
      });
    }

    window.scrollTo(0, scrollTop);
  };

  return { preventScroll, recoverScroll };
};
