import DomainEvent from '../../../commom/domain/building-blocks/event';

export interface VehicleCreatedDomainEventDTO {
    id: number;
    driverId: number;
    type: string;
    capacity: string;
    model: string;
    plate: string;
    occurredOn: Date;
}

export default class VehicleCreatedDomainEvent implements DomainEvent {
    eventName: string = 'VehicleCreatedDomainEvent';
    eventVersion: number = 1;

    public readonly id: number;
    public readonly driverId: number;
    public readonly type: string;
    public readonly capacity: string;
    public readonly model: string;
    public readonly plate: string;
    public readonly occurredOn: Date;

    constructor(dto: VehicleCreatedDomainEventDTO) {
        this.id = dto.id;
        this.driverId = dto.driverId;
        this.type = dto.type;
        this.capacity = dto.capacity;
        this.model = dto.model;
        this.plate = dto.plate;
        this.occurredOn = dto.occurredOn;
    }
}
