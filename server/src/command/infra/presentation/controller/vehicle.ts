import CreateVehicleUseCase from '../../../@core/vehicle/application/use-cases/create-vehicle';
import { inject } from '../../di/registry';
import { Route } from '../../http/server/decorators/route-decorator';
import { ControllerValidationError } from '../../http/server/protocols/controller';
import { HttpMethods } from '../../http/server/protocols/http/methods';
import { HttpStatusCodeEnum } from '../../http/server/protocols/http/status-code';
import { NumberSchema, ObjectSchema, StringSchema } from '../../http/server/validators/schema';

export default class VehiclePresentationControllerFactory {
    @inject('create-vehicle-use-case')
    private readonly createVehicleUseCase!: CreateVehicleUseCase;

    @Route(HttpMethods.POST, '/vehicle')
    createVehiclePresentation() {
        return new ControllerValidationError({
            handler: async (input) => await this.createVehicleUseCase.execute({
                model: input.model,
                plate: input.plate,
                type: input.type,
                capacity: input.capacity,
                driverId: input.driver_id
            }),
            schema: new ObjectSchema({
                driver_id: new NumberSchema().required(),
                model: new StringSchema().required(),
                plate: new StringSchema().required(),
                type: new StringSchema().required(),
                capacity: new StringSchema().required()
            }).required(),
            httpStatusCode: HttpStatusCodeEnum.Created
        });
    }
}
