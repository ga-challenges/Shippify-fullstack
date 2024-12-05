import CreateVehicleUseCase from '../use-cases/create-vehicle';
import { CreateVehicleCommand } from '../../domain/models/vehicle';
import { UnitOfWorkFactory } from '../../../commom/application/unit-of-work/unit-of-work';
import { FakeUowFactory } from '../../../../infra/tests/unit-of-work/in-memory-unit-of-work';
import FakeDomainEventManager from '../../../../infra/tests/domain-event-manager/fake-domain-event-manager';
import DriverNotFoundError from '../errors/driver-not-found';
import Logger from '../../../commom/application/logger/logger';
import LoggerFake from '../../../../infra/tests/logger/fake';
import VehicleRepositoryInMemoryAdapter from '../../../../infra/tests/repositories/vehicle-repository';
import DriverDaoInMemoryAdapter from '../../../../infra/tests/dao/driver-application-dao';

describe('CreateVehicleUseCase', () => {
    let createVehicleUseCase: CreateVehicleUseCase;
    let unitOfWorkFactory: UnitOfWorkFactory;
    let vehicleRepository: VehicleRepositoryInMemoryAdapter;
    let driverDao: DriverDaoInMemoryAdapter;
    let domainEventManager: FakeDomainEventManager;
    let logger: Logger;

    beforeEach(() => {
        const dbSetFake = new Map();
        vehicleRepository = new VehicleRepositoryInMemoryAdapter();
        dbSetFake.set('vehicle', vehicleRepository);

        driverDao = new DriverDaoInMemoryAdapter();
        dbSetFake.set('driver', driverDao);

        unitOfWorkFactory = new FakeUowFactory(dbSetFake);
        domainEventManager = new FakeDomainEventManager();
        logger = new LoggerFake();

        createVehicleUseCase = new CreateVehicleUseCase(unitOfWorkFactory, domainEventManager, logger, driverDao);

        jest.spyOn(domainEventManager, 'publish').mockResolvedValue(undefined);
        jest.spyOn(logger, 'info').mockImplementation(() => {});
    });

    it('should create a new vehicle and return the vehicle id', async () => {
        const driverId = 1;
        driverDao.addDriver(driverId);

        const input: CreateVehicleCommand = {
            driverId,
            type: 'Truck',
            capacity: '10 tons',
            model: 'F-150',
            plate: 'XYZ-1234'
        };

        const result = await createVehicleUseCase.execute(input);
        const vehicle = await vehicleRepository.getById(result.id);

        expect(domainEventManager.publish).toHaveBeenCalledTimes(1);
        expect(logger.info).toHaveBeenCalledWith('VEHICLE CREATED WITH ID 1');

        const vechileJson = vehicle?.toJson();

        expect(vehicle).toBeTruthy();
        expect(vehicle?.getId()?.getValue()).toBe(result.id);
        expect(vechileJson?.type).toBe(input.type);
        expect(vechileJson?.capacity).toBe(input.capacity);
        expect(vechileJson?.model).toBe(input.model);
        expect(vechileJson?.plate).toBe(input.plate);
    });

    it('should throw an error if the driver does not exist', async () => {
        const input: CreateVehicleCommand = {
            driverId: 99,
            type: 'Truck',
            capacity: '10 tons',
            model: 'F-150',
            plate: 'XYZ-1234'
        };
    
        await expect(createVehicleUseCase.execute(input))
            .rejects
            .toThrow(DriverNotFoundError);
    });
});
