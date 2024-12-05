import CreateNewCompanyUseCase from '../../../@core/company/application/use-cases/create-new-company';
import CreateVehicleUseCase from '../../../@core/vehicle/application/use-cases/create-vehicle';
import { inject } from '../../di/registry';
import { Route } from '../../http/server/decorators/route-decorator';
import { ControllerValidationError } from '../../http/server/protocols/controller';
import { HttpMethods } from '../../http/server/protocols/http/methods';
import { HttpStatusCodeEnum } from '../../http/server/protocols/http/status-code';
import { NumberSchema, ObjectSchema, StringSchema } from '../../http/server/validators/schema';

export default class CompanyPresentationControllerFactory {
    @inject('create-new-company-use-case')
    private readonly createNewCompanyUseCase!: CreateNewCompanyUseCase;

    @Route(HttpMethods.POST, '/company')
    createVehiclePresentation() {
        return new ControllerValidationError({
            handler: async (input) => await this.createNewCompanyUseCase.execute({
                city: input.city,
                name: input.name,
                planType: input.plan_type
            }),
            schema: new ObjectSchema({
                city: new NumberSchema().required(),
                name: new StringSchema().required().maxLength(20),
                plan_type: new StringSchema().required().maxLength(20)
            }).required(),
            httpStatusCode: HttpStatusCodeEnum.Created
        });
    }
}
