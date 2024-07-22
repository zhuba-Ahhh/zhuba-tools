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
export declare const prettyLog: (config?: LogConfig) => {
    log: (type: 'info' | 'error' | 'warning' | 'success', text: string, customColor?: string) => void;
    info: (text: string) => void;
    error: (text: string) => void;
    warning: (text: string) => void;
    success: (text: string) => void;
    picture: (url: string, scale?: number, x?: number, y?: number, width?: number, height?: number) => Promise<void>;
};
