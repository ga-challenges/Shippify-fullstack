import DomainError from '../../../../commom/domain/building-blocks/errors/domain-error';
import ValueObject from '../../../../commom/domain/building-blocks/value-objects/value-object';

export class InvalidPlanTypeError extends DomainError {
    constructor() {
        super('PlanType must be one of the valid values: premium, regular');
    }
}

export type PlanTypeType = 'premium'| 'regular'

export default class PlanType extends ValueObject<string> {
    constructor(value: PlanTypeType) {
        super(value);
        if (!this.validateStatus(value)) {
            throw new InvalidPlanTypeError();
        }
    }

    private validateStatus(status: PlanTypeType): boolean {
        const allowedStatuses = ['premium', 'regular'];
        return allowedStatuses.includes(status);
    }
}
