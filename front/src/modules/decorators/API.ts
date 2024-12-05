import HttpClient, { HttpClientOptions, HttpClientResponse } from "../HttpClient";


export type HttpClientApiProps = {
    baseUrl: string
    options?: HttpClientOptions
}

export default class HttpClientApiDecorator implements HttpClient {
    private readonly baseUrl: string;
    private readonly options: HttpClientOptions;

    constructor(
        private readonly httpClient: HttpClient,
        httpClientApiProps: HttpClientApiProps
    ) {
        this.baseUrl = httpClientApiProps.baseUrl;
        this.options = httpClientApiProps.options || {};
    }

    private buildUrl(url: string): string {
        const trimmedBaseUrl = this.baseUrl.endsWith('/')
            ? this.baseUrl.slice(0, -1)
            : this.baseUrl;

        const trimmedUrl = url.startsWith('/')
            ? url.slice(1)
            : url;

        return `${trimmedBaseUrl}/${trimmedUrl}`;
    }

    private mergeOptions(options: HttpClientOptions = {}) {
        return {
            ...this.options,
            ...options
        };
    }

    async delete<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        const fullUrl = this.buildUrl(url);
        return await this.httpClient.delete<T>(fullUrl, this.mergeOptions(options));
    }

    async get<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        const fullUrl = this.buildUrl(url);
        return await this.httpClient.get<T>(fullUrl, this.mergeOptions(options));
    }

    async post<T, U>(url: string, body: U, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        const fullUrl = this.buildUrl(url);
        return await this.httpClient.post<T, U>(fullUrl, body, this.mergeOptions(options));
    }

    async put<T, U>(url: string, body: U, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        const fullUrl = this.buildUrl(url);
        return await this.httpClient.put<T, U>(fullUrl, body, this.mergeOptions(options));
    }
}
