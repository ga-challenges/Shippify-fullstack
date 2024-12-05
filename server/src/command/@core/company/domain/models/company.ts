import AggregateRoot from '../../../commom/domain/building-blocks/aggregate-root';
import City from '../../../commom/domain/building-blocks/value-objects/city';
import Status from '../../../commom/domain/building-blocks/value-objects/status';
import ID, { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import CompanyCreatedDomainEvent from '../events/company-created';
import CompanyFactory from '../creational/factory/company';
import CompanyInactivedDomainEvent from '../events/company-inactived';

export interface RegisterCompanyCommand {
    name: string,
    city: number,
    planType: 'premium' | 'regular',
}

export interface RecoverCompanyCommand extends RegisterCompanyCommand {
    companyId: number
    status: string
}

export default class Company extends AggregateRoot<number> {
    constructor(
        companyId: IncrementID | undefined,
        private name: string,
        private status: Status,
        private city: City,
        private readonly planType: string
    ) {
        super(companyId);
    }

    onIdRegistred(id: ID<number>): void {
        const companyCreatedDomainEvent = new CompanyCreatedDomainEvent({
            city: this.city.getValue(),
            id: id.getValue(),
            name: this.name,
            planType: this.planType,
            status: this.status.getValue()
        });

        this.addEvent(companyCreatedDomainEvent);
    }

    // factory method
    static create(command: RegisterCompanyCommand): Company {
        return CompanyFactory.create({
            ...command,
            status: 'active'
        });
    }

    static recover(command: RecoverCompanyCommand): Company {
        return CompanyFactory.create(command);
    }

    getName() {
        return this.name;
    }

    getStatus() {
        return this.status;
    }

    inactive() {
        this.status = new Status('inactive');
        const driverInactivedDomainEvent = new CompanyInactivedDomainEvent(this.getId().getValue());
        this.addEvent(driverInactivedDomainEvent);
    }

    toJson() {
        return {
            id: this.getIdValue(),
            name: this.name,
            status: this.status.getValue(),
            city: this.city.getValue(),
            planType: this.planType,
            creationDate: this.getCreationDate()
        };
    }    
}
