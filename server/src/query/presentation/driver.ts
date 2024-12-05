import { inject } from '../../command/infra/di/registry';
import { Route } from '../../command/infra/http/server/decorators/route-decorator';
import { ControllerValidationError } from '../../command/infra/http/server/protocols/controller';
import { HttpMethods } from '../../command/infra/http/server/protocols/http/methods';
import DriverQueryService from '../services/driver-query-service';

export default class DriverPresentationFactory {
    @inject('driver-query-service')
    private readonly driverQueryService!: DriverQueryService;

    @Route(HttpMethods.GET, '/company/:company_id/drivers')
    getVehicleByDriverId() {
        return new ControllerValidationError({
            handler: async (input) => await this.driverQueryService.getAllDriversNamesByCompanyId(input.company_id)
        });
    }
}
