import Plate from '../../models/value-objects/Plate';
import Vehicle from '../../models/vehicle';
import VehicleBuilder from './vehicle';

describe('VehicleBuilder', () => {
    it('should build a Vehicle instance with all required fields', () => {
        const vehicle = new VehicleBuilder()
            .setId(1)
            .setDriverId(10)
            .setPlate(new Plate('XYZ-1234'))
            .setModel('Sedan')
            .setType('Car')
            .setCapacity('5')
            .build();

        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.toJson()).toMatchObject({
            id: 1,
            driverId: 10,
            plate: 'XYZ-1234',
            model: 'Sedan',
            type: 'Car',
            capacity: '5'
        });
    });

    it('should allow building a Vehicle without an ID', () => {
        const vehicle = new VehicleBuilder()
            .setDriverId(10)
            .setPlate(new Plate('XYZ-1234'))
            .setModel('SUV')
            .setType('Truck')
            .setCapacity('2')
            .build();

        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.toJson()).toMatchObject({
            id: null,
            driverId: 10,
            plate: 'XYZ-1234',
            model: 'SUV',
            type: 'Truck',
            capacity: '2'
        });
    });
});
