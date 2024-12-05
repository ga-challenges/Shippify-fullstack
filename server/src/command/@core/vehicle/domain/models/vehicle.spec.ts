import { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import Vehicle from './vehicle';

describe('DomainModel Vehicle', () => {
    it('should be able to create a new vehicle', () => {
        const vehicle = Vehicle.create({
            driverId: 1,
            type: 'SUV',
            capacity: '5',
            model: 'Toyota Rav4',
            plate: 'ABC-1234'
        });

        const vehicleEvents = vehicle.getEvents();
        expect(vehicleEvents).toHaveLength(0);

        vehicle.setId(new IncrementID(1));
        const [vehicleCreatedDomainEvent] = vehicleEvents;

        expect(vehicleEvents).toHaveLength(1);
        expect(vehicleCreatedDomainEvent).toBeDefined();
        
        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.toJson()).toMatchObject({
            id: 1,
            driverId: 1,
            type: 'SUV',
            capacity: '5',
            model: 'Toyota Rav4',
            plate: 'ABC-1234',
            creationDate: vehicle.getCreationDate()
        });
    });

    it('should be able to recover an existing vehicle', () => {
        const vehicle = Vehicle.recover({
            id: 100,
            driverId: 1,
            type: 'SUV',
            capacity: '5',
            model: 'Toyota Rav4',
            plate: 'ABC-1234'
        });

        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.toJson()).toMatchObject({
            id: 100,
            driverId: 1,
            type: 'SUV',
            capacity: '5',
            model: 'Toyota Rav4',
            plate: 'ABC-1234',
            creationDate: vehicle.getCreationDate()
        });
    });
});
