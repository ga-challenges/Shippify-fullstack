import Env from "../config/Env";
import HttpClientApiDecorator from "../modules/decorators/API";
import HttpClient from "../modules/HttpClient";

export interface IDriverService {
    getDriverNameAndIdByCompanyId(companyId: number): Promise<Array<{
        name: string
        id: number
    }>>
  }

export default class DriverService implements IDriverService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = new HttpClientApiDecorator(httpClient, {
            baseUrl: Env.get('VITE_SERVER_URL')
        });
    }

    async getDriverNameAndIdByCompanyId(companyId: number): Promise<Array<{ name: string; id: number }>> {
        const { data: { data } } = await this.httpClient.get<{ data: Array<{ name: string; id: number }>}>(`/company/${companyId}/drivers`)
        return data
    }
}