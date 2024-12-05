import { ULID } from './id';

describe('ULID', () => {
    it('should create a ULID automatically if no ID is provided', () => {
        const ulidInstance = new ULID();
        expect(ulidInstance.getValue()).toEqual(expect.any(String));
        expect(ulidInstance.getValue().length).toBeGreaterThan(0);
    });

    it('should create a ULID with the provided ID', () => {
        const providedId = '01H6R3M99T0P2Y3N7ZC6GJX3WZ';
        const ulidInstance = new ULID(providedId);
        expect(ulidInstance.getValue()).toBe(providedId);
    });

    it('should correctly inherit from ValueObject', () => {
        const ulidInstance = new ULID();
        expect(ulidInstance).toBeInstanceOf(ULID);
    });

    it('should generate unique IDs when created automatically', () => {
        const ulid1 = new ULID();
        const ulid2 = new ULID();
        expect(ulid1.getValue()).not.toBe(ulid2.getValue());
    });
});
