/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

export interface HttpClientResponse<T> {
    data: T,
    statusCode: number
}

export type HttpClientOptions = Record<string, unknown>

export interface HttpClient {
    get<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>>;
    post<T, U>(url: string, body: U, options?: HttpClientOptions): Promise<HttpClientResponse<T>>;
    put<T, U>(url: string, body: U, options?: HttpClientOptions): Promise<HttpClientResponse<T>>;
    delete<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>>;
}

export default HttpClient;

export class AxiosHttpClientAdapter implements HttpClient {
    async get<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, options);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    async post<T, U>(url: string, body: U, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.post(url, body, options);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    async put<T, U>(url: string, body: U, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.put(url, body, options);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    async delete<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.delete(url, options);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    private handleError<T>(error: any): HttpClientResponse<T> {
        if (error.response) {
            return {
                data: error.response.data,
                statusCode: error.response.status
            };
        } else if (error.request) {
            return {
                data: {} as T,
                statusCode: 0
            };
        } else {
            return {
                data: {} as T,
                statusCode: 0
            };
        }
    }
}
