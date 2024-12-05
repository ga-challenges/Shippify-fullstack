import DomainEvent from '../../../commom/domain/building-blocks/event';

export interface DriverRegistredDomainEventDTO {
    id: number;
    companyId: number;
    name: string;
    email: string;
    phone: string;
    avatarUrl: string;
    status: string;
    city: number;
    occurredOn: Date;
}

export default class DriverRegistredDomainEvent implements DomainEvent {
    eventName: string = 'DriverRegistredDomainEvent';
    eventVersion: number = 1;

    public readonly id: number;
    public readonly companyId: number;
    public readonly name: string;
    public readonly email: string;
    public readonly phone: string;
    public readonly avatarUrl: string;
    public readonly status: string;
    public readonly city: number;
    public readonly occurredOn: Date;

    constructor(dto: DriverRegistredDomainEventDTO) {
        this.companyId = dto.companyId;
        this.name = dto.name;
        this.email = dto.email;
        this.phone = dto.phone;
        this.avatarUrl = dto.avatarUrl;
        this.status = dto.status;
        this.city = dto.city;
        this.occurredOn = dto.occurredOn;
        this.id = dto.id;
    }
}
