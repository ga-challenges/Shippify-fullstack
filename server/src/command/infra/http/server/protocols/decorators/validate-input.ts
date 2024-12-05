import { IValidatable } from '../../validators/schema';
import Controller from '../controller';
import { HttpStatusCodeEnum } from '../http/status-code';

export class ValidateInputDecorator {
    constructor(
        private readonly controller: Controller,
        private readonly schema?: IValidatable
    ) {}

    async handler(req: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }> {
        if (this.schema) {
            const validationResult = this.schema.validate(req);
            if (!validationResult.success) {
                return {
                    statusCode: HttpStatusCodeEnum.UnprocessableEntity,
                    data: { message: validationResult.error as any }
                };
            }
            req = validationResult.values!;
        }

        return this.controller.handler(req);
    }
}
