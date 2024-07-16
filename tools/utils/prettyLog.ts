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

  return {
    ...{
      info: (text: string) => log('info', text),
      error: (text: string) => log('error', text),
      warning: (text: string) => log('warning', text),
      success: (text: string) => log('success', text)
    },
    log
  };
};
