import { InvalidCityError } from '../../../../../@core/commom/domain/building-blocks/value-objects/city';
import { InvalidStatusError } from '../../../../../@core/commom/domain/building-blocks/value-objects/status';
import CompanyNameAlreadyExists from '../../../../../@core/company/application/errors/company-name-already-registed';
import { InvalidPlanTypeError } from '../../../../../@core/company/domain/models/value-objects/plan-type';
import CompanyNotFoundError from '../../../../../@core/driver/application/errors/company-not-found';
import { InvalidAvatarUrlError } from '../../../../../@core/driver/domain/models/value-objects/avatar-url';
import { InvalidEmailError } from '../../../../../@core/driver/domain/models/value-objects/email';
import { InvalidPhoneError } from '../../../../../@core/driver/domain/models/value-objects/phone';
import DriverNotFoundError from '../../../../../@core/vehicle/application/errors/driver-not-found';
import { InvalidPlateDomainError } from '../../../../../@core/vehicle/domain/models/value-objects/Plate';
import { inject } from '../../../../di/registry';
import Controller from '../controller';
import { HttpStatusCodeEnum } from '../http/status-code';

const errors: Record<number, any> = {
    [HttpStatusCodeEnum.UnprocessableEntity]: [CompanyNameAlreadyExists, DriverNotFoundError, CompanyNotFoundError, InvalidAvatarUrlError, InvalidCityError, InvalidEmailError, InvalidPhoneError, InvalidStatusError, InvalidPlanTypeError, InvalidPlateDomainError]
};

export interface InternalServerErrorDao {
    save(error: Record<string, unknown>): Promise<void>
}

class VerifyStatusCodeType {
    static isInternalServerError(statusCode: HttpStatusCodeEnum) {
        return statusCode > 499 && statusCode < 599;
    }
}

export class ErrorHandlingDecorator implements Controller {
    @inject('internalServerErrorDao')
    private readonly dao!: InternalServerErrorDao;

    constructor(private readonly controller: Controller) {}

    async handler(req: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }> {
        try {
            return await this.controller.handler(req);
        } catch (err: any) {
            const statusCode = Object.entries(errors).find(([_, exceptions]) =>
                (exceptions as any[]).some(exc => err instanceof exc)
            )?.[0];

            const responseStatusCode = (statusCode as any) || HttpStatusCodeEnum.InternalServerError;

            if(VerifyStatusCodeType.isInternalServerError(responseStatusCode) || !err.message) {
                this.dao.save(err.message);
                return {
                    statusCode: responseStatusCode,
                    data: undefined
                };
            }

            return {
                statusCode: responseStatusCode,
                data: { message: err.message }
            };
        }
    }
}
