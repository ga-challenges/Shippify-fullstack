import DomainEventManager from '../../../commom/application/event/event-manager';
import Logger from '../../../commom/application/logger/logger';
import { UnitOfWork, UnitOfWorkFactory } from '../../../commom/application/unit-of-work/unit-of-work';
import { BaseUseCaseCommand } from '../../../commom/application/use-case';
import { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import Company, { RegisterCompanyCommand } from '../../domain/models/company';
import CompanyRepository from '../../domain/repository/company-repository';
import CompanyApplicationDao from '../dao/company';
import CompanyNameAlreadyExists from '../errors/company-name-already-registed';

type OutputCreateCompanyUseCaseDto = {
    id: number
}

export default class CreateNewCompanyUseCase extends BaseUseCaseCommand<RegisterCompanyCommand, OutputCreateCompanyUseCaseDto> {
    protected context: string = 'CREATE NEW COMPANY';

    constructor(
        unitOfWorkFactory: UnitOfWorkFactory,
        domainEventManager: DomainEventManager,
        logger: Logger,
        private readonly companyApplicationDao: CompanyApplicationDao
    ) {
        super(unitOfWorkFactory, domainEventManager, logger);
    }

    protected async handle(input: RegisterCompanyCommand, unitOfWork: UnitOfWork): Promise<OutputCreateCompanyUseCaseDto> {
        const companyNameAlreadyeExists = await this.companyApplicationDao.doesCompanyExistByName(input.name);

        if(companyNameAlreadyeExists) { throw new CompanyNameAlreadyExists(); }

        const companyRepository = unitOfWork.getRepository<CompanyRepository>('company');
        const company = Company.create(input);

        const companyId = await companyRepository.save(company);
        const incrementsCompanyId = new IncrementID(companyId);
        company.setId(incrementsCompanyId);
        this.logger.info(`CREATE COMPANY WITH ID ${companyId}`);
        await this.domainEventManager.publish(company);

        return {
            id: company.getId().getValue()
        };
    }
}
