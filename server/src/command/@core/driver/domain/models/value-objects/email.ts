import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidEmailError extends DomainError {
    constructor() {
        super('Email format is invalid');
    }
}

export default class Email extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        if (!Email.validateEmail(value)) {
            throw new InvalidEmailError();
        }
    }

    static validateEmail(email: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
}
