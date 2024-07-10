class Logger {
  static formatStack(stack: string) {
    if (!stack) return '';
    // 格式化错误堆栈的逻辑
    return stack
      .split('\n')
      .map((line: any) => `    at ${line}`)
      .join('\n');
  }

  static log(level: LogLevel, message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    const stack = error ? error.stack : '';
    let formattedMessage = `[${timestamp}] [${level}] ${message} ${stack}`;

    if (error) {
      formattedMessage += `\n${this.formatStack(error.stack || '')}`;
    }

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }

  static debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }

  static info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  static warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  static error(message: string, error?: Error): void {
    this.log(LogLevel.ERROR, message, error);
  }

  static fatal(message: string, error?: Error): void {
    this.log(LogLevel.FATAL, message, error);
  }
}

export default Logger;

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
}

// Logger.info('Application is starting...');
// Logger.error('Failed to load user data', new Error('Network Error'));
