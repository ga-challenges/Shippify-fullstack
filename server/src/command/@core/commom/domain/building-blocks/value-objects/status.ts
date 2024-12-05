import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidStatusError extends DomainError {
    constructor() {
        super('Status must be one of the valid values: active, inactive, suspended');
    }
}

export default class Status extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        if (!this.validateStatus(value)) {
            throw new InvalidStatusError();
        }
    }

    private validateStatus(status: string): boolean {
        const allowedStatuses = ['active', 'inactive', 'suspended'];
        return allowedStatuses.includes(status);
    }
}
