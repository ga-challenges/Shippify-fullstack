import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidPhoneError extends DomainError {
    constructor() {
        super('Phone number format is invalid');
    }
}

export default class Phone extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        if (!this.validatePhone(value)) {
            throw new InvalidPhoneError();
        }
    }

    private validatePhone(phone: string): boolean {
        const regex = /^[0-9]{10,15}$/;
        return regex.test(phone);
    }
}
