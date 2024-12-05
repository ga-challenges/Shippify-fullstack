import RegisterNewDriverUseCase from '../use-cases/register-new-driver';
import { RegisterDriverCommand } from '../../domain/models/driver';
import DriverRepositoryInMemoryAdapter from '../../../../infra/tests/repositories/driver-repository';
import { UnitOfWorkFactory } from '../../../commom/application/unit-of-work/unit-of-work';
import { FakeUowFactory } from '../../../../infra/tests/unit-of-work/in-memory-unit-of-work';
import FakeDomainEventManager from '../../../../infra/tests/domain-event-manager/fake-domain-event-manager';
import DriverRepository from '../../domain/repository/driver';
import CompanyApplicationDao from '../../../company/application/dao/company';
import CompanyApplicationDaoInMemoryAdapter from '../../../../infra/tests/dao/company-application-dao';
import CompanyNotFoundError from '../errors/company-not-found';
import Logger from '../../../commom/application/logger/logger';
import LoggerFake from '../../../../infra/tests/logger/fake';

describe('RegisterNewDriverUseCase', () => {
    let registerNewDriverUseCase: RegisterNewDriverUseCase;
    let unitOfWorkFactory: UnitOfWorkFactory;
    let driverRepository: DriverRepositoryInMemoryAdapter;
    let domainEventManager: FakeDomainEventManager;
    let logger: Logger;
    let companyApplicationDao: CompanyApplicationDao;

    beforeEach(() => {
        const dbSetFake = new Map();
        driverRepository = new DriverRepositoryInMemoryAdapter();
        dbSetFake.set('driver', driverRepository);
        unitOfWorkFactory = new FakeUowFactory(dbSetFake);
        domainEventManager = new FakeDomainEventManager();
        logger = new LoggerFake();

        const companyApplicationDaoInMemoryAdapter = new CompanyApplicationDaoInMemoryAdapter();
        companyApplicationDaoInMemoryAdapter.addCompanyId(1);

        companyApplicationDao = companyApplicationDaoInMemoryAdapter;
        registerNewDriverUseCase = new RegisterNewDriverUseCase(unitOfWorkFactory, domainEventManager, logger, companyApplicationDao);

        jest.spyOn(domainEventManager, 'publish').mockResolvedValue(undefined);
        jest.spyOn(logger, 'info').mockImplementation(() => {});
    });

    it('should register a new driver and return the driver id', async () => {
        const input: RegisterDriverCommand = {
            companyId: 1,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png'
        };

        const result = await registerNewDriverUseCase.execute(input);
        const driver = await driverRepository.getById(result.id);

        const driverJson = driver?.toJson();

        expect(domainEventManager.publish).toHaveBeenCalledTimes(1);
        expect(logger.info).toHaveBeenCalledWith('DRIVER 1 WITH NAME John Doe');
        
        expect(driver).toBeTruthy();
        expect(driver?.getId()?.getValue()).toBe(result.id);
        expect(driverJson?.name).toBe(input.name);
        expect(driverJson?.email).toBe(input.email);
    });

    it('should throw an error if the company does not exist', async () => {
        const input: RegisterDriverCommand = {
            companyId: 99,
            city: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            phone: '11999999999',
            avatarUrl: 'https://avatar.com/image.png'
        };
    
        await expect(registerNewDriverUseCase.execute(input))
            .rejects
            .toThrow(CompanyNotFoundError);
    });
});
