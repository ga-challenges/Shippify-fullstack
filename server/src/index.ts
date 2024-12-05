import DomainEventManager from './command/@core/commom/application/event/event-manager';
import CreateNewCompanyUseCase from './command/@core/company/application/use-cases/create-new-company';
import RegisterNewDriverUseCase from './command/@core/driver/application/use-cases/register-new-driver';
import CreateVehicleUseCase from './command/@core/vehicle/application/use-cases/create-vehicle';
import Env from './command/infra/config/env';
import CompanyMySqlApplicationDaoAdapter from './command/infra/database/mysql/dao/company-dao';
import DriveryMySqlApplicationDaoAdapter from './command/infra/database/mysql/dao/driver-dao';
import MySql2Adapter, { MySQLConnection } from './command/infra/database/mysql/mysql2';
import CompanyMySqlRepositoryAdapter from './command/infra/database/mysql/repositories/company';
import DriverMySqlRepositoryAdapter from './command/infra/database/mysql/repositories/driver';
import VehicleMySqlRepositoryAdapter from './command/infra/database/mysql/repositories/vehicle';
import { DbSetMySQL2, UnitOfWorkMySQL2Factory } from './command/infra/database/mysql/uow/uow';
import { Registry } from './command/infra/di/registry';
import ExpressServerAdapter from './command/infra/http/server/adapters/express';
import FakeDomainEventManager from './command/infra/tests/domain-event-manager/fake-domain-event-manager';
import ConsoleLogger from './command/infra/tests/logger/console';
import CompanyMySqlQueryDaoAdapter from './query/dao/mysql/company';
import DriverMySqlQueryDaoAdapter from './query/dao/mysql/driver';
import VehicleMySQLAdapterQueryDao from './query/dao/mysql/vehicle';
import CompanyQueryService from './query/services/company-query-service';
import DriverQueryService from './query/services/driver-query-service';
import VehicleQueryService from './query/services/vehicle-query-service';

const main = async () => {
    const mySqlconnection = MySQLConnection.connect({
        database: Env.get('MYSQL_DATABASE'),
        host: Env.get('MYSQL_HOST'),
        password: Env.get('MYSQL_PASSWORD'),
        port: +Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER')
    });

    const mysql2Adapter = new MySql2Adapter(mySqlconnection);

    const dbSetunitOfWork = new DbSetMySQL2();

    dbSetunitOfWork.registerRepository('company', CompanyMySqlRepositoryAdapter);
    dbSetunitOfWork.registerRepository('driver', DriverMySqlRepositoryAdapter);
    dbSetunitOfWork.registerRepository('vehicle', VehicleMySqlRepositoryAdapter);

    const unitOfWorkMySQL2Factory = new UnitOfWorkMySQL2Factory(mySqlconnection, dbSetunitOfWork);

    const logger = new ConsoleLogger();

    const express = new ExpressServerAdapter('/api/v1');

    const registry = Registry.getInstance();
    registry.provide('http-server', express);

    const domainEventManager: DomainEventManager = new FakeDomainEventManager();

    registry.provide('unit-of-work-factory', unitOfWorkMySQL2Factory);
    registry.provide('http-server', express);
    registry.provide('logger', logger);
    registry.provide('domain-event-manager', domainEventManager);
    
    const companyApplicationDao = new CompanyMySqlApplicationDaoAdapter(mysql2Adapter);
    const driverApplicationDao = new DriveryMySqlApplicationDaoAdapter(mysql2Adapter);
    const vehicleQueryDao = new VehicleMySQLAdapterQueryDao(mysql2Adapter);
    const companyQueryDao = new CompanyMySqlQueryDaoAdapter(mysql2Adapter);
    const driverQueryDao = new DriverMySqlQueryDaoAdapter(mysql2Adapter);

    registry.provide('create-company-use-case', new CreateNewCompanyUseCase(unitOfWorkMySQL2Factory, domainEventManager, logger, companyApplicationDao));
    registry.provide('create-vehicle-use-case', new CreateVehicleUseCase(unitOfWorkMySQL2Factory, domainEventManager, logger, driverApplicationDao));
    registry.provide('register-new-driver-use-case', new RegisterNewDriverUseCase(unitOfWorkMySQL2Factory, domainEventManager, logger, companyApplicationDao));

    registry.provide('vehicle-query-service', new VehicleQueryService(vehicleQueryDao));
    registry.provide('company-query-service', new CompanyQueryService(companyQueryDao));
    registry.provide('driver-query-service', new DriverQueryService(driverQueryDao));

    require('./command/infra/presentation/controller/company');
    require('./command/infra/presentation/controller/vehicle');
    require('./command/infra/presentation/controller/driver');

    require('./query/presentation/vehicle');
    require('./query/presentation/driver');
    require('./query/presentation/company');

    const PORT = +Env.get('PORT');
    express.listen(PORT, () => { logger.info(
        `SERVER IS RUNNING ON PORT: ${PORT}`
    ); });
};

main();
