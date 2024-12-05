import AggregateRoot from './aggregate-root';
import DomainEvent from './event';
import ID, { IDMock } from './value-objects/id';

class AggregateRootTest extends AggregateRoot<string> {
    public addEventPublic(...events: DomainEvent[]) {
        this.addEvent(...events);
    }

    toJson(): Record<string, unknown> {
        return {};
    }
}

class DomainEventTest implements DomainEvent {
    public readonly eventName = 'test';
    public readonly occurredOn = new Date();
    public readonly eventVersion = 1;
}

describe('AggregateRoot', () => {
    let id: ID<string>;

    beforeEach(() => {
        id = new IDMock('id');
    });

    it('should add a single event to the events list', () => {
        const aggregate = new AggregateRootTest(id);
        const domainEvent = new DomainEventTest();

        aggregate.addEventPublic(domainEvent);

        const events = aggregate.getEvents();
        expect(events).toHaveLength(1);
        expect(events[0]).toBe(domainEvent);
    });

    it('should add multiple events to the events list', () => {
        const aggregate = new AggregateRootTest(id);

        const event1 = new DomainEventTest();
        const event2 = new DomainEventTest();

        aggregate.addEventPublic(event1, event2);

        const events = aggregate.getEvents();
        expect(events).toHaveLength(2);
        expect(events).toContain(event1);
        expect(events).toContain(event2);
    });

    it('should return an empty list when no events are added', () => {
        const aggregate = new AggregateRootTest(id);
        const events = aggregate.getEvents();
        expect(events).toHaveLength(0);
    });
});
