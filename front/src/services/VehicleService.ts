import { HttpStatusCode } from "axios";
import HttpClientApiDecorator from "../modules/decorators/API";
import HttpClient from "../modules/HttpClient";
import { Vehicle } from "../types/Vehicle";
import Env from "../config/Env";

export interface IVehicleServiceCreateVehicle {
  driverId: number,
  type: string,
  model: string,
  plate: string,
  capacity: string
}

export interface IVehicleService {
  getVehiclesByDriver(driverId: number, page: number): Promise<{
    totalPages: number,
    totalItems: number,
    currentPage: number,
    items: Vehicle[]
  }>

  createVehicle(input: IVehicleServiceCreateVehicle | unknown): Promise<boolean>
}

export class VehicleService implements IVehicleService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = new HttpClientApiDecorator(httpClient, {
      baseUrl: Env.get('VITE_SERVER_URL')
  });
  }

  async getVehiclesByDriver(driverId: number, page = 1): Promise<{
    totalPages: number,
    totalItems: number,
    currentPage: number,
    items: Vehicle[]
  }> {
    const { data: { data } } = await this.httpClient.get<{
      data: {
      total_pages: number,
      total_items: number,
      current_page: number,
      items: Vehicle[]
    }
    }>(`/driver/${driverId}/vehicles?page=${page}`)
 
    return {
      currentPage: data.current_page,
      totalPages: data.total_pages,
      items: data.items,
      totalItems: data.total_items
    };
  }

  async createVehicle(input: IVehicleServiceCreateVehicle): Promise<boolean> {
    const { statusCode } = await this.httpClient.post('/vehicle', {
      ...input,
      driverId: undefined,
      driver_id: input.driverId
    })
    return statusCode === HttpStatusCode.Created
  }

}
