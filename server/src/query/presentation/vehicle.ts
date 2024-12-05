import { inject } from '../../command/infra/di/registry';
import { Route } from '../../command/infra/http/server/decorators/route-decorator';
import { ControllerValidationError } from '../../command/infra/http/server/protocols/controller';
import { HttpMethods } from '../../command/infra/http/server/protocols/http/methods';
import { NumberSchema, ObjectSchema } from '../../command/infra/http/server/validators/schema';
import VehicleQueryService from '../services/vehicle-query-service';

export default class VehiclePresentationFactory {
    @inject('vehicle-query-service')
    private readonly vehicleQueryService!: VehicleQueryService;

    @Route(HttpMethods.GET, '/driver/:driver_id/vehicles')
    getVehicleByDriverId() {
        return new ControllerValidationError({
            handler: async (input) => await this.vehicleQueryService.listVehiclesByDriverFromCompanyPaginated({
                pageSize: input.page_size,
                driverId: input.driver_id,
                page: input.page
            }),
            schema: new ObjectSchema({
                page_size: new NumberSchema(),
                page: new NumberSchema(),
                driver_id: new NumberSchema().required()
            }).required()
        });
    }
}
