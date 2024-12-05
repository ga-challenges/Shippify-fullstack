import { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import Company, { RecoverCompanyCommand, RegisterCompanyCommand } from './company';

describe('Company Entity', () => {
    it('should create a new company and emit a CompanyCreatedDomainEvent', () => {
        const command: RegisterCompanyCommand = {
            name: 'TechCorp',
            city: 202,
            planType: 'premium'
        };

        const company = Company.create(command);

        company.setId(new IncrementID(5));

        expect(company.getName()).toBe(command.name);
        expect(company.getStatus().getValue()).toBe('active');
        expect(company.toJson()).toMatchObject({
            name: command.name,
            city: command.city,
            planType: command.planType,
            status: 'active',
            id: 5
        });
        expect(company.getEvents()).toHaveLength(1);
    });

    it('should recover an existing company', () => {
        const command: RecoverCompanyCommand = {
            companyId: 5,
            name: 'TechCorp',
            city: 202,
            status: 'inactive',
            planType: 'regular'
        };

        const company = Company.recover(command);

        expect(company.getName()).toBe(command.name);
        expect(company.getStatus().getValue()).toBe(command.status);
        expect(company.toJson()).toMatchObject({
            id: 5,
            name: command.name,
            city: command.city,
            planType: command.planType,
            status: command.status
        });
        expect(company.getEvents()).toHaveLength(0);
    });

    it('should change company status to inactive and emit a CompanyInactivedDomainEvent', () => {
        const command: RecoverCompanyCommand = {
            companyId: 5,
            name: 'TechCorp',
            city: 202,
            planType: 'premium',
            status: 'active'
        };

        const company = Company.create(command);

        company.inactive();

        expect(company.getStatus().getValue()).toBe('inactive');
        expect(company.getEvents()).toHaveLength(1);
    });
});
