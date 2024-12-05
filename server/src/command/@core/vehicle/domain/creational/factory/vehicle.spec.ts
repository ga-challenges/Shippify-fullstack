import Vehicle from '../../models/vehicle';
import VehicleFactory, { VehicleFactoryGenerateInput } from './vehicle';

describe('VehicleFactory', () => {
    it('should generate a new Vehicle without an ID', () => {
        const input: VehicleFactoryGenerateInput = {
            driverId: 10,
            plate: 'XYZ-1234',
            model: 'Sedan',
            type: 'Car',
            capacity: '5'
        };

        const vehicle = VehicleFactory.generate(input);

        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.toJson()).toMatchObject({
            id: null,
            driverId: 10,
            plate: 'XYZ-1234',
            model: 'Sedan',
            type: 'Car',
            capacity: '5'
        });
    });

    it('should generate an existing Vehicle with an ID', () => {
        const input: VehicleFactoryGenerateInput = {
            id: 1,
            driverId: 10,
            plate: 'XYZ-5678',
            model: 'SUV',
            type: 'Truck',
            capacity: '2'
        };

        const vehicle = VehicleFactory.generate(input);

        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.toJson()).toMatchObject({
            id: 1,
            driverId: 10,
            plate: 'XYZ-5678',
            model: 'SUV',
            type: 'Truck',
            capacity: '2'
        });
    });
});
