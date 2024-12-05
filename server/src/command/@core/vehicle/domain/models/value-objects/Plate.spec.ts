import Plate, { InvalidPlateDomainError } from './Plate';


describe('Plate Value Object', () => {
    it('should create a valid plate', () => {
        const plateValue = 'ABC-1234';
        const plate = new Plate(plateValue);

        expect(plate.getValue()).toBe(plateValue);
    });

    it('should throw an error for an invalid plate format (missing dash)', () => {
        const invalidPlate = 'ABC1234';
        expect(() => new Plate(invalidPlate)).toThrowError(
            InvalidPlateDomainError
        );
    });

    it('should throw an error for an invalid plate format (wrong pattern)', () => {
        const invalidPlate = '123-ABCD';
        expect(() => new Plate(invalidPlate)).toThrowError(
            InvalidPlateDomainError
        );
    });

    it('should throw an error for an invalid plate format (too short)', () => {
        const invalidPlate = 'AB-123';
        expect(() => new Plate(invalidPlate)).toThrowError(InvalidPlateDomainError);
    });

    it('should throw an error for an invalid plate format (lowercase letters)', () => {
        const invalidPlate = 'abc-1234';
        expect(() => new Plate(invalidPlate)).toThrowError(InvalidPlateDomainError);
    });
});
