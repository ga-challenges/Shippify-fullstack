import Company, { RecoverCompanyCommand } from '../../models/company';
import CompanyFactory, { CompanyFactoryGenerateInput } from './company';

describe('CompanyFactory', () => {
    it('should generate a new Company with RegisterCompanyCommand', () => {
        const command: CompanyFactoryGenerateInput = {
            name: 'Tech Corp',
            status: 'active',
            city: 1,
            planType: 'premium'
        };

        const company = CompanyFactory.create(command);

        expect(company).toBeInstanceOf(Company);
        expect(company.toJson()).toMatchObject({
            name: 'Tech Corp',
            status: 'active',
            city: 1,
            planType: 'premium'
        });
        expect(company.getIdValue()).toBeNull();
    });

    it('should generate an existing Company with RecoverCompanyCommand', () => {
        const command: RecoverCompanyCommand = {
            companyId: 101,
            name: 'Tech Corp',
            status: 'inactive',
            city: 2,
            planType: 'premium'
        };

        const company = CompanyFactory.create(command);

        expect(company).toBeInstanceOf(Company);
        expect(company.toJson()).toMatchObject({
            id: 101,
            name: 'Tech Corp',
            status: 'inactive',
            city: 2,
            planType: 'premium'
        });
    });
});
