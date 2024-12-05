import HttpResponse from '../http/http-response';

interface Middleware<T = any, K = any> {
    handle(input: T, next: (input?: any) => void): Promise<void | HttpResponse<K>>,
}

export default Middleware;
