import DomainEvent from '../../../commom/domain/building-blocks/event';

export default class CompanyInactivedDomainEvent implements DomainEvent {
    readonly eventName: string = 'CompanyInactivedDomainEvent';
    readonly eventVersion: number = 2;
    readonly occurredOn: Date = new Date();

    constructor(
        readonly companyId: number
    ) {}
}
