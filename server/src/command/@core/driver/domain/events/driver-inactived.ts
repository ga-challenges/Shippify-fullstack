import DomainEvent from '../../../commom/domain/building-blocks/event';

export default class DriverInactivedDomainEvent implements DomainEvent {
    eventVersion: number = 2;
    eventName: string = 'DriverInactivedDomainEvent';
    occurredOn: Date = new Date();

    constructor(
        public readonly driverId: number
    ) {}
}
