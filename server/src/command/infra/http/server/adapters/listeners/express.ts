import Route from '../../protocols/routes/route';
import { Request } from 'express';

export interface RouteCallback {
    on(request: Request, route: Route): Promise<{
        status: number,
        data: unknown,
        input: unknown,
    }>
}

export default class DefaultRouteCallback implements RouteCallback {
    async on(request: Request, route: Route): Promise<{
        status: number,
        data: unknown,
        input: unknown
    }> {
        const inputWithouFile = {
            ...request.body,
            ...request.query,
            ...request.params,
            ...request.headers
        };

        const responseController = await route.controller.handler(inputWithouFile);

        return {
            status: responseController.statusCode,
            data: responseController.data,
            input: inputWithouFile
        };
    }
}
