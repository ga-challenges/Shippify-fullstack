import Phone, { InvalidPhoneError } from './phone';

describe('Phone', () => {
    it('should create a valid Phone with a correct format', () => {
        const phone = new Phone('1234567890');
        expect(phone.getValue()).toBe('1234567890');
    });

    it('should throw InvalidPhoneError if the phone number format is invalid', () => {
        expect(() => new Phone('123')).toThrow(InvalidPhoneError);
        expect(() => new Phone('invalid-phone')).toThrow(InvalidPhoneError);
    });
});
