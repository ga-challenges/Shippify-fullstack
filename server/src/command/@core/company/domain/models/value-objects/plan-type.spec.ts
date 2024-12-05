import PlanType, { InvalidPlanTypeError } from './plan-type';

describe('PlanType', () => {
    it('should create a valid PlanType with a valid value', () => {
        const premium = new PlanType('premium');
        expect(premium.getValue()).toBe('premium');

        const regular = new PlanType('regular');
        expect(regular.getValue()).toBe('regular');
    });

    it('should throw InvalidPlanTypeError if the PlanType is not one of the allowed values', () => {
        expect(() => new PlanType('basic' as any)).toThrow(InvalidPlanTypeError);
    });
});
