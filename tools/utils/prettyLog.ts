export interface LogConfig {
  infoColor?: string;
  errorColor?: string;
  warningColor?: string;
  successColor?: string;
  fontSize?: string;
  fontStyle?: string;
  titlePadding?: string;
  titleBackgroundColor?: string;
  messageColor?: string;
  messagePaddingLeft?: string;
}

export const prettyLog = (config: LogConfig = {}) => {
  const {
    infoColor = '#909399',
    errorColor = '#F56C6C',
    warningColor = '#E6A23C',
    successColor = '#67C23A',
    fontSize = '12px',
    fontStyle = 'normal',
    titlePadding = '1px',
    titleBackgroundColor,
    messageColor = 'black',
    messagePaddingLeft = '5px'
  } = config;

  const logStyle = (color: string, isTitle: boolean) => `
    font-size: ${fontSize};
    font-style: ${fontStyle};
    background: ${isTitle ? titleBackgroundColor || color : 'transparent'};
    border: 1px solid ${color};
    padding: ${isTitle ? titlePadding : '1px'};
    border-radius: 2px;
    color: ${isTitle ? '#fff' : messageColor};
  `;

  const prettyPrint = (title: string, text: string, color: string) => {
    console.log(
      `%c${title} %c${text}`,
      logStyle(color, true),
      `padding-left: ${messagePaddingLeft};`
    );
  };

  const logMessage = (title: string, text: string, color: string) => {
    prettyPrint(title, text, color);
  };

  const log = (
    type: 'info' | 'error' | 'warning' | 'success',
    text: string,
    customColor?: string
  ) => {
    const color =
      customColor ||
      (type === 'info'
        ? infoColor
        : type === 'error'
          ? errorColor
          : type === 'warning'
            ? warningColor
            : successColor);
    logMessage(type[0].toUpperCase() + type.slice(1), text, color);
  };

  let cachedImg: HTMLImageElement | null = null;
  let cachedCanvas: HTMLCanvasElement | null = null;

  const createOrUpdateElement = <T>(element: T | null, type: 'img' | 'canvas'): T => {
    if (!element) {
      return type === 'img' ? (new Image() as T) : (document.createElement('canvas') as T);
    }
    return element as T;
  };

  const picture = async (url: string, scale = 1, x = 0, y = 0, width = 0, height = 0) => {
    cachedImg = createOrUpdateElement<HTMLImageElement>(cachedImg, 'img');
    cachedCanvas = createOrUpdateElement<HTMLCanvasElement>(cachedCanvas, 'canvas');

    const img = cachedImg!;
    const canvas = cachedCanvas!;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    img.crossOrigin = 'anonymous';
    img.src = url;

    return new Promise<void>((resolve, reject) => {
      img.onload = () => {
        const drawWidth = width || img.width;
        const drawHeight = height || img.height;

        canvas.width = drawWidth;
        canvas.height = drawHeight;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, drawWidth, drawHeight);
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        const dataUri = canvas.toDataURL('image/png');

        console.log(
          `%c sup?`,
          `font-size: 1px;
          padding: ${Math.floor((drawHeight * scale) / 2)}px ${Math.floor((drawWidth * scale) / 2)}px;
          background-image: url(${dataUri});
          background-repeat: no-repeat;
          background-position: center;
          background-size: ${drawWidth * scale}px ${drawHeight * scale}px;
          color: transparent;
          `
        );

        resolve();
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  };

  return {
    ...{
      info: (text: string) => log('info', text),
      error: (text: string) => log('error', text),
      warning: (text: string) => log('warning', text),
      success: (text: string) => log('success', text),
      picture: (
        url: string,
        scale?: number,
        x?: number,
        y?: number,
        width?: number,
        height?: number
      ) => picture(url, scale, x, y, width, height)
    },
    log
  };
};
