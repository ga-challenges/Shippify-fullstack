import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidPlateDomainError extends DomainError {
    constructor() {
        super('Invalid Plate Format');
    }
}

export default class Plate extends ValueObject<string> {
    private static readonly VALID_PLATE_REGEX = /^[A-Z]{3}-\d{4}$/;

    constructor(value: string) {
        Plate.validate(value);
        super(value);
    }

    private static validate(value: string): void {
        if (!Plate.VALID_PLATE_REGEX.test(value)) {
            throw new InvalidPlateDomainError();
        }
    }
}
