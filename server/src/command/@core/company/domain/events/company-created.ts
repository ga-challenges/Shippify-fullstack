import DomainEvent from '../../../commom/domain/building-blocks/event';

export interface CompanyCreatedDomainEventDTO {
    id: number;
    name: string,
    status: string,
    city: number,
    planType: string
}

export default class CompanyCreatedDomainEvent implements DomainEvent {
    eventName: string = 'CompanyCreatedDomainEvent';
    eventVersion: number = 1;

    public readonly id: number;
    public readonly name: string;
    public readonly status: string;
    public readonly city: number;
    public readonly planType: string;
    public readonly occurredOn: Date;

    constructor(dto: CompanyCreatedDomainEventDTO) {
        this.id = dto.id;
        this.name = dto.name;
        this.status = dto.status;
        this.city = dto.city;
        this.planType = dto.planType;
        this.occurredOn = new Date;
    }
}
