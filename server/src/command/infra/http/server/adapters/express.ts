import Route from '../protocols/routes/route';
import HttpServer from '../protocols/server';

import 'express-async-errors';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';

import { HttpStatusCodeEnum } from '../protocols/http/status-code';
import DefaultRouteCallback, { RouteCallback } from './listeners/express';
import { ResponseHandlerStrategyFactory } from './handlers/response/strategy';
import Middleware from '../protocols/routes/midleware';

export default class ExpressServerAdapter implements HttpServer {
    private readonly app: Express;

    constructor(
        private readonly preUrl: string,
        private routeCallback: RouteCallback = new DefaultRouteCallback()
    ) {
        this.app = express();
        this.setupMiddlewares();
    }

    private setupMiddlewares() {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }

    public setCallback(routeCallback: RouteCallback): void {
        this.routeCallback = routeCallback;
    }

    private createNext(request: Request, next: NextFunction) {
        return (data: any) => {
            request.body = { ...request.body, ...data };
            next();
        };
    }

    private handleMiddlewareError(response: Response): void {
        response.sendStatus(HttpStatusCodeEnum.InternalServerError);
    }

    private async applyMiddleware(
        middleware: Middleware,
        request: Request,
        response: Response,
        next: (data: any) => void
    ): Promise<void> {
        try {
            const result = await middleware.handle(
                { authorization: request.headers.authorization, ip: request.ip },
                next
            );

            if (result) {
                response.status(result.statusCode).send(result.data);
            }
        } catch (error) {
            console.error('Middleware Error:', error);
            this.handleMiddlewareError(response);
        }
    }

    public addMiddleware(middleware: Middleware): void {
        this.app.use(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                const input = { ...req.headers, ...req.query, ip: req.ip };
                const result = await middleware.handle(input, this.createNext(req, next));

                if (result) {
                    return res.status(result.statusCode).send(result.data);
                }
                next();
            } catch (error) {
                this.handleMiddlewareError(res);
            }
        });
    }

    public on(route: Route): void {
        const { middleware } = route;

        const middlewareFunction = middleware
            ? (req: Request, res: Response, next: NextFunction) =>
                this.applyMiddleware(middleware, req, res, this.createNext(req, next))
            : (req: Request, res: Response, next: NextFunction) => next();

        this.app[route.method](
            this.preUrl + route.endpoint,
            middlewareFunction,
            async (req: Request, res: Response) => {
                try {
                    const routeResponse = await this.routeCallback.on(req, route);
                    const strategy = ResponseHandlerStrategyFactory.create(routeResponse);
                    strategy.handle(res, routeResponse);
                } catch (error) {
                    this.handleMiddlewareError(res);
                }
            }
        );
    }

    public listen(port: number, callback: () => void): void {
        this.app.listen(port, callback);
    }
}
