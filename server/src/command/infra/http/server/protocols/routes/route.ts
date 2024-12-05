import Controller from '../controller';
import { HttpMethods } from '../http/methods';
import Middleware from './midleware';

interface Route {
    endpoint: string,
    method: HttpMethods,
    controller: Controller
    middleware?: Middleware
}

export default Route;
