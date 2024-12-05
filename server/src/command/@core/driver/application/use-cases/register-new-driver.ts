import DomainEventManager from '../../../commom/application/event/event-manager';
import Logger from '../../../commom/application/logger/logger';
import { UnitOfWork, UnitOfWorkFactory } from '../../../commom/application/unit-of-work/unit-of-work';
import { BaseUseCaseCommand } from '../../../commom/application/use-case';
import { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import CompanyApplicationDao from '../../../company/application/dao/company';
import Driver, { RegisterDriverCommand } from '../../domain/models/driver';
import DriverRepository from '../../domain/repository/driver';
import CompanyNotFoundError from '../errors/company-not-found';

type OutputRegisterNewDriverUseCaseDto = {
    id: number
}

export default class RegisterNewDriverUseCase extends BaseUseCaseCommand<RegisterDriverCommand, OutputRegisterNewDriverUseCaseDto>  {
    protected context: string = 'REGISTER NEW DRIVER';

    constructor(
        unitOfWorkFactory: UnitOfWorkFactory,
        domainEventManager: DomainEventManager,
        logger: Logger,
        private readonly companyApplicationDao: CompanyApplicationDao
    ) {
        super(unitOfWorkFactory, domainEventManager, logger);
    }

    protected async handle(input: RegisterDriverCommand, unitOfWork: UnitOfWork): Promise<OutputRegisterNewDriverUseCaseDto> {
        const companyExists = await this.companyApplicationDao.doesCompanyExistById(input.companyId);

        if(!companyExists) {
            throw new CompanyNotFoundError();
        }

        const driverRepository = unitOfWork.getRepository<DriverRepository>('driver');
        const driver = Driver.register(input);
        const driverId = await driverRepository.save(driver);
        driver.setId(new IncrementID(driverId));
        await this.domainEventManager.publish(driver);
        this.logger.info(`DRIVER ${driverId} WITH NAME ${driver.getName()}`);
        return { id: driverId };
    }
}
