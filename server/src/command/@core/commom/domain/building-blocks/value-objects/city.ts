import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidCityError extends DomainError {
    constructor() {
        super('City must be a valid number and greater than 0');
    }
}

export default class City extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        if (value <= 0) {
            throw new InvalidCityError();
        }
    }
}
