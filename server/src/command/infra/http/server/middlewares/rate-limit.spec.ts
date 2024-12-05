
import { HttpStatusCodeEnum } from '../protocols/http/status-code';
import RateLimitMiddleware from './rate-limit';

describe('RateLimitMiddleware', () => {
    let rateLimitMiddleware: RateLimitMiddleware;
    const maxRequests = 5;
    const windowMs = 1000;

    beforeEach(() => {
        rateLimitMiddleware = new RateLimitMiddleware({ maxRequests, windowMs });
    });

    it('should allow requests within the rate limit', async () => {
        const input = { ip: '192.168.0.1' };
        let calls = 0;

        const next = jest.fn(async () => {
            calls += 1;
        });

        for (let i = 0; i < maxRequests; i++) {
            await rateLimitMiddleware.handle(input, next);
        }

        expect(calls).toBe(maxRequests);
        expect(next).toHaveBeenCalledTimes(maxRequests);
    });

    it('should reject requests exceeding the rate limit', async () => {
        const input = { ip: '192.168.0.1' };

        const next = jest.fn();

        for (let i = 0; i < maxRequests; i++) {
            await rateLimitMiddleware.handle(input, next);
        }

        const response = await rateLimitMiddleware.handle(input, next);
        expect(response).toEqual({
            data: {
                message: 'Rate limit exceeded'
            },
            statusCode: HttpStatusCodeEnum.TooManyRequests
        });
    });

    it('should reset the count after the window period', async () => {
        const input = { ip: '192.168.0.1' };

        const next = jest.fn();

        for (let i = 0; i < maxRequests; i++) {
            await rateLimitMiddleware.handle(input, next);
        }

        const response = await rateLimitMiddleware.handle(input, next);

        expect(response).toMatchObject({'data': {'message': 'Rate limit exceeded'}, 'statusCode': 429});
        expect(next).toHaveBeenCalledTimes(maxRequests);
    });
});
