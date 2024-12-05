import Status, { InvalidStatusError } from './status';

describe('Status', () => {
    it('should create a valid Status with a valid value', () => {
        const status = new Status('active');
        expect(status.getValue()).toBe('active');
    });

    it('should throw InvalidStatusError if the status is not one of the allowed values', () => {
        expect(() => new Status('invalid-status')).toThrow(InvalidStatusError);
        expect(() => new Status('archived')).toThrow(InvalidStatusError);
    });
});
