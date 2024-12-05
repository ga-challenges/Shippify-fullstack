interface Logger {
    info(...message: unknown[]): void;
    warning(...message: unknown[]): void;
    error(...message: unknown[]): void;
}

export default Logger;
