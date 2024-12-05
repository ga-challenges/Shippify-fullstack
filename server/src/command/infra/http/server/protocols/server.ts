import Middleware from './routes/midleware';
import Route from './routes/route';

interface HttpServer {
    listen(port: number, callback: () => void): void
    on(route: Route): void
    addMiddleware(middleware: Middleware): void
}

export default HttpServer;
