import City, { InvalidCityError } from './city';

describe('City', () => {
    it('should create a valid City with a number greater than 0', () => {
        const city = new City(1);
        expect(city.getValue()).toBe(1);
    });

    it('should throw InvalidCityError if the city number is less than or equal to 0', () => {
        expect(() => new City(0)).toThrow(InvalidCityError);
        expect(() => new City(-1)).toThrow(InvalidCityError);
    });
});
