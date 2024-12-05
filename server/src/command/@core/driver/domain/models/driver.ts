import AggregateRoot from '../../../commom/domain/building-blocks/aggregate-root';
import City from '../../../commom/domain/building-blocks/value-objects/city';
import ID, { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import Status from '../../../commom/domain/building-blocks/value-objects/status';
import DriverFactory from '../creational/factory/driver';
import DriverInactivedDomainEvent from '../events/driver-inactived';
import DriverRegistredDomainEvent from '../events/driver-registred';
import AvatarUrl from './value-objects/avatar-url';
import Email from './value-objects/email';
import Phone from './value-objects/phone';

export interface RegisterDriverCommand {
    companyId: number,
    name: string,
    email: string,
    phone: string,
    avatarUrl: string,
    city: number,
    id?: number;
}

export interface RecoverDriverCommand extends RegisterDriverCommand {
    id: number
    status: string
}

export default class Driver extends AggregateRoot<number> {
    constructor(
        id: IncrementID | undefined,
        private readonly companyId: IncrementID,
        private name: string,
        private readonly email: Email,
        private phone: Phone,
        private avatarUrl: AvatarUrl,
        private status: Status,
        private city: City
    ) {
        super(id);
    }

    onIdRegistred(id: ID<number>): void {
        const driverRegistredEvent = new DriverRegistredDomainEvent({
            avatarUrl: this.avatarUrl.getValue(),
            city: this.city.getValue(),
            companyId: this.companyId.getValue(),
            email: this.email.getValue(),
            id: id.getValue(),
            name: this.name,
            occurredOn: this.creationDate,
            phone: this.phone.getValue(),
            status: this.status.getValue()
        });

        this.addEvent(driverRegistredEvent);
    }

    // factory method
    static register(command: RegisterDriverCommand): Driver {
        return DriverFactory.generate({ ...command, status: 'active', id: undefined });
    }

    static recover(command: RecoverDriverCommand): Driver {
        return DriverFactory.generate(command);
    }

    getName() {
        return this.name;
    }

    getStatus() {
        return this.status;
    }

    inactive() {
        this.status = new Status('inactive');
        const driverInactivedDomainEvent = new DriverInactivedDomainEvent(this.getId().getValue());
        this.addEvent(driverInactivedDomainEvent);
    }

    toJson() {
        return {
            id: this.getIdValue(),
            companyId: this.companyId.getValue(),
            name: this.name,
            email: this.email.getValue(),
            phone: this.phone.getValue(),
            avatarUrl: this.avatarUrl.getValue(),
            status: this.status.getValue(),
            city: this.city.getValue(),
            creationDate: this.creationDate
        };
    }    
}
