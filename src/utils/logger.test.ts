import Logger, { getLogger } from './logger';

describe('getLogger', () => {
    let stdoutSpy: jest.SpyInstance;
    let stderrSpy: jest.SpyInstance;

    beforeEach(() => {
        // Mock stdout and stderr to capture log output
        stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
        stderrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return an object with info, error, and warn functions', () => {
        const logger = getLogger('TestClass');
        expect(logger).toHaveProperty('info');
        expect(typeof logger.info).toBe('function');
        expect(logger).toHaveProperty('error');
        expect(typeof logger.error).toBe('function');
        expect(logger).toHaveProperty('warn');
        expect(typeof logger.warn).toBe('function');
    });

    it('should call Logger.info with correct parameters', () => {
        const infoSpy = jest.spyOn(Logger, 'info');
        const logger = getLogger('TestClass');
        logger.info('Test info message');

        expect(infoSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Test info message',
            className: 'TestClass'
        }));
        expect(stdoutSpy).toHaveBeenCalled();
    });

    it('should call Logger.error with correct parameters', () => {
        const errorSpy = jest.spyOn(Logger, 'error');
        const logger = getLogger('ErrorClass');
        logger.error('Test error message');

        expect(errorSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Test error message',
            className: 'ErrorClass'
        }));

        // Winston writes console errors to stdout by default unless `stderrLevels` is configured
        // Just verify one of them is called.
        expect(stdoutSpy.mock.calls.length + stderrSpy.mock.calls.length).toBeGreaterThan(0);
    });

    it('should call Logger.warn with correct parameters', () => {
        const warnSpy = jest.spyOn(Logger, 'warn');
        const logger = getLogger('WarnClass');
        logger.warn('Test warn message');

        expect(warnSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Test warn message',
            className: 'WarnClass'
        }));
    });

    it('should handle undefined className gracefully in Winston formats', () => {
        // Calling Logger directly to test the formatter with missing className
        Logger.info({ message: 'Message without class', className: undefined });

        // Winston writes output to either stdout or stderr.
        expect(stdoutSpy).toHaveBeenCalled();
        const output = stdoutSpy.mock.calls[0][0];

        expect(output).toContain('INFO');
        expect(output).toContain('Message without class');
        expect(output).not.toContain('[  ]');
    });
});
