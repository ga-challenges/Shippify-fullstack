import { IValidatable } from '../validators/schema';
import { HttpStatusCodeEnum } from './http/status-code';
import { BaseController } from './decorators/handler';
import { ValidateInputDecorator } from './decorators/validate-input';
import { ErrorHandlingDecorator } from './decorators/handle-errors';

export type ControllerInput = Record<string, unknown>;

interface Controller {
    handler<K>(req: ControllerInput): Promise<{
        statusCode: HttpStatusCodeEnum,
        data: { data: K } | { message: string }
    }>
};

export class ControllerValidationError implements Controller {
    constructor(private readonly options: {
        schema?: IValidatable,
        httpStatusCode?: HttpStatusCodeEnum,
        handler: (req: any) => Promise<any>
    }) {}

    async handler<K>(req: ControllerInput): Promise<{ statusCode: HttpStatusCodeEnum; data: { data: K; } | { message: string; }; }> {
        let handler: Controller = new BaseController(this.options.handler, this.options.httpStatusCode);
        handler = new ErrorHandlingDecorator(handler);
        handler = new ValidateInputDecorator(handler, this.options.schema);

        return handler.handler(req);
    }
}

export default Controller;
