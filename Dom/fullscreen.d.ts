type FullscreenElement = HTMLElement & {
    requestFullscreen: (options?: FullscreenOptions) => Promise<void>;
    mozRequestFullScreen: () => Promise<void>;
    msRequestFullscreen: () => Promise<void>;
    webkitRequestFullScreen: () => Promise<void>;
};
/**
 * @description 全屏
 * @param element 全屏元素
 */
export declare const launchFullscreen: (element: FullscreenElement) => void;
/**
 * @description 退出全屏
 */
export declare const exitFullscreen: () => void;
export {};
