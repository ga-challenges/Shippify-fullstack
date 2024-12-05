import 'reflect-metadata';
import HttpServer from '../protocols/server';
import { HttpMethods } from '../protocols/http/methods';
import { Registry } from '../../../di/registry';

const registry = Registry.getInstance();

export function Route(method: HttpMethods, path: string) {
    const appServer = registry.inject('http-server') as HttpServer;

    return function(target: any, propertyKey: string | symbol) {
        const instance = new target.constructor();
        appServer.on({
            controller: instance[propertyKey](),
            endpoint: path,
            method: method as HttpMethods
        });
    };
}
