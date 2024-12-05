import DomainEventManager from '../../../commom/application/event/event-manager';
import Logger from '../../../commom/application/logger/logger';
import { UnitOfWork, UnitOfWorkFactory } from '../../../commom/application/unit-of-work/unit-of-work';
import { BaseUseCaseCommand } from '../../../commom/application/use-case';
import { IncrementID } from '../../../commom/domain/building-blocks/value-objects/id';
import DriverDao from '../../../driver/application/dao/driver';
import Vehicle, { CreateVehicleCommand } from '../../domain/models/vehicle';
import VehicleRepository from '../../domain/repository/vechile';
import DriverNotFoundError from '../errors/driver-not-found';

type OutputCreateVehicleUseCaseDto = {
    id: number
}

export default class CreateVehicleUseCase extends BaseUseCaseCommand<CreateVehicleCommand, OutputCreateVehicleUseCaseDto > {
    protected context: string = 'CREATE VEHICLE';

    constructor(
        unitOfWorkFactory: UnitOfWorkFactory,
        domainEventManager: DomainEventManager,
        logger: Logger,
        private readonly driverDao: DriverDao
    ) {
        super(unitOfWorkFactory, domainEventManager, logger);
    }

    protected async handle(input: CreateVehicleCommand, unitOfWork: UnitOfWork): Promise<OutputCreateVehicleUseCaseDto> {
        const driverExists = await this.driverDao.doesDriverExistById(input.driverId);

        if(!driverExists) {
            throw new DriverNotFoundError();
        }

        const vehicleRepository = unitOfWork.getRepository<VehicleRepository>('vehicle');
        const vehicle = Vehicle.create(input);
        const vehicleId = await vehicleRepository.save(vehicle); 
        vehicle.setId(new IncrementID(vehicleId));

        this.logger.info(`VEHICLE CREATED WITH ID ${vehicleId}`);

        await this.domainEventManager.publish(vehicle);
        return { id: vehicleId };
    }
}
