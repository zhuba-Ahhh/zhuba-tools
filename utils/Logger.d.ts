declare class Logger {
    static formatStack(stack: string): string;
    static log(level: LogLevel, message: string, error?: Error): void;
    static debug(message: string): void;
    static info(message: string): void;
    static warn(message: string): void;
    static error(message: string, error?: Error): void;
    static fatal(message: string, error?: Error): void;
}
export default Logger;
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}
