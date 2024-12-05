import HttpResponse from '../protocols/http/http-response';
import { HttpStatusCodeEnum } from '../protocols/http/status-code';
import Middleware from '../protocols/routes/midleware';

interface RateLimitOptions {
    maxRequests: number;
    windowMs: number;
}

export default class RateLimitMiddleware implements Middleware<{ ip: string }, { message: string }> {
    private requestCounts = new Map<string, { count: number; startTime: number }>();
    

    constructor(private options: RateLimitOptions) {
        this.options = options;
    }

    async handle(input: { ip: string }, next: (input: any) => void): Promise<void | HttpResponse<any>> {
        const { ip } = input;
        const now = Date.now();
        const entry = this.requestCounts.get(ip);

        if (!entry || now - entry.startTime > this.options.windowMs) {
            this.requestCounts.set(ip, { count: 1, startTime: now });
        } else if (entry.count >= this.options.maxRequests) {
            return { data: {
                message: 'Rate limit exceeded'
            }, statusCode: HttpStatusCodeEnum.TooManyRequests };
        } else {
            entry.count += 1;
            this.requestCounts.set(ip, entry);
        }

        return next(input);
    }
}
