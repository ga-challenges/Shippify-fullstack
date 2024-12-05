import { HttpStatusCodeEnum } from './status-code';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface HttpResponse<T = any> {
    statusCode: HttpStatusCodeEnum,
    data: T
}

export default HttpResponse;
