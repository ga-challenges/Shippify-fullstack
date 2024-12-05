import AggregateRoot from '../../../commom/domain/building-blocks/aggregate-root';
import ID, { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import VehicleFactory from '../creational/factory/vehicle';
import VehicleCreatedDomainEvent from '../events/vehicle-created';
import Plate from './value-objects/Plate';

export interface CreateVehicleCommand {
    driverId: number,
    type: string,
    capacity: string,
    model: string,
    plate: string
}

export interface RecoverVehicleCommand extends CreateVehicleCommand {
    id: number
}

export default class Vehicle extends AggregateRoot<number> {
    constructor(
        id: IncrementID | undefined,
        private readonly driverId: IncrementID,
        private readonly plate: Plate,
        private readonly model: string,
        private readonly type: string,
        private readonly capacity: string
    ) {
        super(id);
    }

    static create(command: CreateVehicleCommand) {
        return VehicleFactory.generate(command);
    }

    static recover(command: RecoverVehicleCommand) {
        return VehicleFactory.generate(command);
    }

    onIdRegistred(id: ID<number>): void {
        const vehicleCreatedDomainEvent = new VehicleCreatedDomainEvent({
            capacity: this.capacity,
            driverId: this.driverId.getValue(),
            id: id.getValue(),
            model: this.model,
            occurredOn: this.creationDate,
            plate: this.plate.getValue(),
            type: this.type
        });
        this.addEvent(vehicleCreatedDomainEvent);
    }

    toJson() {
        return {
            id: this.getIdValue(),
            driverId: this.driverId.getValue(),
            plate: this.plate.getValue(),
            model: this.model,
            type: this.type,
            capacity: this.capacity,
            creationDate: this.getCreationDate()
        };
    }
}
