import ValueObject from './value-object';

class ValueObjectTest extends ValueObject<number> {}

describe('Value Object', () => {
    it('should be able match object', () => {
        const valueObject = new ValueObjectTest(1);
        const valueObject2 = new ValueObjectTest(1);

        expect(valueObject.match(valueObject2)).toBeTruthy();
    });

    it('should not be able match object', () => {
        const valueObject = new ValueObjectTest(1);
        const valueObject2 = new ValueObjectTest(2);

        expect(valueObject.match(valueObject2)).toBeFalsy();
    });
});
