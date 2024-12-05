import { IncrementID } from '../../../../commom/domain/building-blocks/value-objects/id';
import Builder from '../../../../commom/domain/design-patterns/builder';
import Plate from '../../models/value-objects/Plate';
import Vehicle from '../../models/vehicle';


export default class VehicleBuilder implements Builder<Vehicle> {
    private id?: IncrementID;
    private driverId!: IncrementID;
    private plate!: Plate;
    private model!: string;
    private type!: string;
    private capacity!: string;

    setId(id: number | undefined): this {
        this.id = id ? new IncrementID(id) : undefined;
        return this;
    }

    setDriverId(driverId: number): this {
        this.driverId = new IncrementID(driverId);
        return this;
    }

    setPlate(plate: Plate): this {
        this.plate = plate;
        return this;
    }

    setModel(model: string): this {
        this.model = model;
        return this;
    }

    setType(type: string): this {
        this.type = type;
        return this;
    }

    setCapacity(capacity: string): this {
        this.capacity = capacity;
        return this;
    }

    build(): Vehicle {
        return new Vehicle(
            this.id,
            this.driverId,
            this.plate,
            this.model,
            this.type,
            this.capacity
        );
    }
}
