import CreateNewCompanyUseCase from '../use-cases/create-new-company';
import { RegisterCompanyCommand } from '../../domain/models/company';
import CompanyRepositoryInMemoryAdapter from '../../../../infra/tests/repositories/company-repository';
import { UnitOfWorkFactory } from '../../../commom/application/unit-of-work/unit-of-work';
import { FakeUowFactory } from '../../../../infra/tests/unit-of-work/in-memory-unit-of-work';
import FakeDomainEventManager from '../../../../infra/tests/domain-event-manager/fake-domain-event-manager';
import CompanyRepository from '../../domain/repository/company-repository';
import CompanyApplicationDao from '../../../company/application/dao/company';
import CompanyApplicationDaoInMemoryAdapter from '../../../../infra/tests/dao/company-application-dao';
import CompanyNameAlreadyExists from '../errors/company-name-already-registed';
import Logger from '../../../commom/application/logger/logger';
import LoggerFake from '../../../../infra/tests/logger/fake';

describe('CreateNewCompanyUseCase', () => {
    let createNewCompanyUseCase: CreateNewCompanyUseCase;
    let unitOfWorkFactory: UnitOfWorkFactory;
    let companyRepository: CompanyRepositoryInMemoryAdapter;
    let domainEventManager: FakeDomainEventManager;
    let logger: Logger;
    let companyApplicationDao: CompanyApplicationDao;

    beforeEach(() => {
        const dbSetFake = new Map();
        companyRepository = new CompanyRepositoryInMemoryAdapter();
        dbSetFake.set('company', companyRepository);
        unitOfWorkFactory = new FakeUowFactory(dbSetFake);
        domainEventManager = new FakeDomainEventManager();
        logger = new LoggerFake();

        const companyApplicationDaoInMemoryAdapter = new CompanyApplicationDaoInMemoryAdapter();
        companyApplicationDaoInMemoryAdapter.addCompanyName('MyCompany');

        companyApplicationDao = companyApplicationDaoInMemoryAdapter;
        createNewCompanyUseCase = new CreateNewCompanyUseCase(unitOfWorkFactory, domainEventManager, logger, companyApplicationDao);

        jest.spyOn(domainEventManager, 'publish').mockResolvedValue(undefined);
        jest.spyOn(logger, 'info').mockImplementation(() => {});
    });

    it('should create a new company and return the company id', async () => {
        const input: RegisterCompanyCommand = {
            name: 'NewCompany',
            city: 22,
            planType: 'premium'
        };

        const result = await createNewCompanyUseCase.execute(input);
        const company = await companyRepository.getById(1);

        const companyJson = company?.toJson();

        expect(domainEventManager.publish).toHaveBeenCalledTimes(1);
        expect(logger.info).toHaveBeenCalledWith('CREATE COMPANY WITH ID 1');
        
        expect(company).toBeTruthy();
        expect(company?.getId()?.getValue()).toBe(result.id);
        expect(companyJson?.name).toBe(input.name);
    });

    it('should throw an error if the company name already exists', async () => {
        const input: RegisterCompanyCommand = {
            name: 'MyCompany',
            city: 22,
            planType: 'premium'
        };
    
        await expect(createNewCompanyUseCase.execute(input))
            .rejects
            .toThrow(CompanyNameAlreadyExists);
    });
});
