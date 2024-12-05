import ConsoleLogger from './console';

describe('ConsoleLogger', () => {
    let logger: ConsoleLogger;
    let consoleErrorSpy: jest.SpyInstance;
    let consoleInfoSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
        logger = new ConsoleLogger();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should call console.error when error is called', () => {
        const errorMessage = 'Test error message';
        logger.error(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
    });

    it('should call console.info when info is called', () => {
        const infoMessage = 'Test info message';
        logger.info(infoMessage);
        expect(consoleInfoSpy).toHaveBeenCalledWith(infoMessage);
    });

    it('should call console.warn when warning is called', () => {
        const warningMessage = 'Test warning message';
        logger.warning(warningMessage);
        expect(consoleWarnSpy).toHaveBeenCalledWith(warningMessage);
    });
});
