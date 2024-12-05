import City from '../../../../commom/domain/building-blocks/value-objects/city';
import { IncrementID } from '../../../../commom/domain/building-blocks/value-objects/id';
import Status from '../../../../commom/domain/building-blocks/value-objects/status';
import Company, { RecoverCompanyCommand, RegisterCompanyCommand } from '../../models/company';

export interface CompanyFactoryGenerateInput 
    extends Omit<RecoverCompanyCommand, 'companyId'> { 
    companyId?: number;
}

export default class CompanyFactory {
    static create(command: CompanyFactoryGenerateInput): Company {
        return new Company(
            command.companyId ? new IncrementID(command.companyId) : undefined,
            command.name,
            new Status(command.status),
            new City(command.city),
            command.planType
        );
    }
}
