/* eslint-disable @typescript-eslint/no-unnecessary-condition */
type FullscreenElement = HTMLElement & {
  requestFullscreen: (options?: FullscreenOptions) => Promise<void>;
  mozRequestFullScreen: () => Promise<void>; // 旧版浏览器可能不支持 options 参数
  msRequestFullscreen: () => Promise<void>;
  webkitRequestFullScreen: () => Promise<void>;
};

/**
 * @description 全屏
 * @param element 全屏元素
 */
export const launchFullscreen = (element: FullscreenElement) => {
  if (element?.requestFullscreen) {
    element.requestFullscreen();
  } else if (element?.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element?.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element?.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
};

// launchFullscreen(document.documentElement as FullscreenElement);
// launchFullscreen(document.getElementById('id') as FullscreenElement); //某个元素进入全屏

/**
 * @description 退出全屏
 */
export const exitFullscreen = () => {
  if (document?.exitFullscreen) {
    document.exitFullscreen();
  }
  // else if (document?.msExitFullscreen) {
  //   document.msExitFullscreen();
  // } else if (document?.mozCancelFullScreen) {
  //   document.mozCancelFullScreen();
  // } else if (document?.webkitExitFullscreen) {
  //   document?.webkitExitFullscreen();
  // }
};

// exitFullscreen();
