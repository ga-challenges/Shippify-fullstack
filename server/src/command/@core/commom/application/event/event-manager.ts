import AggregateRoot from '../../domain/building-blocks/aggregate-root';
import DomainEvent from '../../domain/building-blocks/event';
import Handler from './handler';

interface DomainEventManager {
    register(handler: Handler): void
    publish(...aggregateRoot: Array<AggregateRoot<string | number> | DomainEvent>): Promise<void>
}

export default DomainEventManager;
