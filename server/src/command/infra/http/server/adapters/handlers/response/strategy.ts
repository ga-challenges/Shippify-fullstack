import { Response } from 'express';

interface ResponseHandlerStrategy {
    handle(response: Response, responseCallback: any): Promise<Response>;
}

class FileResponseHandler implements ResponseHandlerStrategy {
    async handle(response: Response, responseCallback: any): Promise<Response> {
        response.setHeader('Content-Disposition', `attachment; filename="${responseCallback.data.data.originalname || 'file'}"`);
        response.setHeader('Content-Type', responseCallback.data.mimetype || 'application/octet-stream');
        return response.status(+responseCallback.status).send(responseCallback.data.data.buffer);
    }
}

class DefaultResponseHandler implements ResponseHandlerStrategy {
    async handle(response: Response, responseCallback: any): Promise<Response> {
        return response.status(+responseCallback.status).send(responseCallback.data);
    }
}

export class ResponseHandlerStrategyFactory {
    static create(responseCallback: any) {
        if (responseCallback.data?.data && responseCallback.data?.data?.buffer) {
            return new FileResponseHandler();
        }

        return new DefaultResponseHandler();
    }
}
