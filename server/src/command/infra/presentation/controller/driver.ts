import RegisterNewDriverUseCase from '../../../@core/driver/application/use-cases/register-new-driver';
import { inject } from '../../di/registry';
import { Route } from '../../http/server/decorators/route-decorator';
import { ControllerValidationError } from '../../http/server/protocols/controller';
import { HttpMethods } from '../../http/server/protocols/http/methods';
import { HttpStatusCodeEnum } from '../../http/server/protocols/http/status-code';
import { ObjectSchema, NumberSchema, StringSchema } from '../../http/server/validators/schema';

export default class DriverPresentationControllerFactory {
    @inject('register-new-driver-use-case')
    private readonly registerNewDriverUseCase!: RegisterNewDriverUseCase;

    @Route(HttpMethods.POST, '/driver')
    createVehiclePresentation() {
        return new ControllerValidationError({
            handler: async (input) => await this.registerNewDriverUseCase.execute({
                avatarUrl: input.avatar_url,
                name: input.name,
                city: input.city,
                companyId: input.company_id,
                email: input.email,
                phone: input.phone
            }),
            schema: new ObjectSchema({
                avatar_url: new StringSchema().required(),
                name: new StringSchema().required().maxLength(40),
                city: new NumberSchema().required(),
                company_id: new NumberSchema().required(),
                email: new StringSchema().required().email(),
                phone: new StringSchema().required()
            }).required(),
            httpStatusCode: HttpStatusCodeEnum.Created
        });
    }
}
