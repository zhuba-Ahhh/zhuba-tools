/**
 * 功能描述：一些业务场景，如弹框出现时，需要禁止页面滚动，这是兼容安卓和 iOS 禁止页面滚动的解决方案
 */
export declare const createScrollControl: () => {
    preventScroll: () => void;
    recoverScroll: () => void;
};
