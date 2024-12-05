import Entity from './entity';
import DomainEvent from './event';

export default abstract class AggregateRoot<T extends string | number > extends Entity<T> {
    private readonly events: DomainEvent[] = [];

    protected addEvent(...events: DomainEvent[]) {
        this.events.push(...events);
    }

    getEvents() {
        return this.events;
    }

    abstract toJson(): Record<string, unknown>
}
