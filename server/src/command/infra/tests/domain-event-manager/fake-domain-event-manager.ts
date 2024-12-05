import DomainEventManager from '../../../@core/commom/application/event/event-manager';
import Handler from '../../../@core/commom/application/event/handler';
import AggregateRoot from '../../../@core/commom/domain/building-blocks/aggregate-root';

export default class FakeDomainEventManager implements DomainEventManager {
    async publish(...aggregateRoot: AggregateRoot<string | number>[]): Promise<void> {
        // aggregateRoot.forEach(item => console.log(item.getEvents()))
    }

    async register(handler: Handler) {
        // console.log(handler.handlerEventName, 'registreted')
    }
}
