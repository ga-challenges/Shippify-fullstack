import Controller from '../controller';
import { HttpStatusCodeEnum } from '../http/status-code';

interface Handler {
    setNext(handler: Handler): Handler;
    handle(response: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }>;
}

abstract class BaseHandler implements Handler {
    protected nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    abstract handle(response: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }>
}

class NoContentHandler extends BaseHandler {
    async handle(response: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }> {
        if (response === undefined) {
            return { statusCode: HttpStatusCodeEnum.NoContent, data: undefined };
        }
        if(!this.nextHandler) {
            return {
                data: undefined,
                statusCode: HttpStatusCodeEnum.InternalServerError
            };
        }
        return this.nextHandler.handle(response);
    }
}

class DataHandler extends BaseHandler {
    constructor(
        private readonly statusCodeBase?: HttpStatusCodeEnum
    ) {
        super();
    }

    async handle(response: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }> {
        return {
            statusCode: this.statusCodeBase || HttpStatusCodeEnum.OK,
            data: { data: response }
        };
    }
}

export class BaseController implements Controller {
    private handlerChain: Handler;

    constructor(
        private readonly handlerFn: (req: any) => Promise<any>,
        statusCodeBase?: HttpStatusCodeEnum
    ) {
        this.handlerChain = new NoContentHandler();
        const dataHandler = new DataHandler(statusCodeBase);
        this.handlerChain.setNext(dataHandler);
    }

    async handler(req: any): Promise<{ statusCode: HttpStatusCodeEnum; data: any; }> {
        const response = await this.handlerFn(req);
        return this.handlerChain.handle(response);
    }
}
