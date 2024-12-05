import { IncrementID } from '../../../../commom/domain/building-blocks/value-objects/id';
import Plate from '../../models/value-objects/Plate';
import Vehicle, { RecoverVehicleCommand } from '../../models/vehicle';

export interface VehicleFactoryGenerateInput extends Omit<RecoverVehicleCommand, 'id'> {
    id?: number;
}

export default class VehicleFactory {
    static generate(input: VehicleFactoryGenerateInput): Vehicle {
        return new Vehicle(
            input.id ? new IncrementID(input.id) : undefined,
            new IncrementID(input.driverId),
            new Plate(input.plate),
            input.model,
            input.type,
            input.capacity
        );
    }
}
