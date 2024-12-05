interface DomainEvent {
    eventName: string
    occurredOn: Date
    eventVersion: number
}

export default DomainEvent;
