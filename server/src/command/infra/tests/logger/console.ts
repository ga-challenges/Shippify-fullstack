import Logger from '../../../@core/commom/application/logger/logger';

export default class ConsoleLogger implements Logger {
    error(...message: unknown[]): void {
        console.error(...message);
    }

    info(...message: unknown[]): void {
        console.info(...message);
    }

    warning(...message: unknown[]): void {
        console.warn(...message);
    }
}
