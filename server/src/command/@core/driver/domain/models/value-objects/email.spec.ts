import Email, { InvalidEmailError } from './email';

describe('Email', () => {
    it('should create a valid Email with a correct format', () => {
        const email = new Email('test@example.com');
        expect(email.getValue()).toBe('test@example.com');
    });

    it('should throw InvalidEmailError if the email format is invalid', () => {
        expect(() => new Email('invalid-email')).toThrow(InvalidEmailError);
        expect(() => new Email('test@com')).toThrow(InvalidEmailError);
    });
});
