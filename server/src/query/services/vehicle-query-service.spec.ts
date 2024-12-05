import VehicleQueryDao, { VehicleQueryDaoInput } from '../dao/protocols/vehicle';
import VehicleQueryModel from '../models/vehicle';
import { PaginatedResult } from '../protocols/query-pagination';
import VehicleQueryService from './vehicle-query-service';

class VehicleQueryDaoFake implements VehicleQueryDao {
    async listVehiclesByDriverFromCompanyPaginated(input: VehicleQueryDaoInput): Promise<PaginatedResult<VehicleQueryModel>> {
        if (input.driverId === 1) {
            return {
                totalPages: 2,
                totalItems: 15,
                currentPage: input.page || 1,
                items: [
                    { id: 1, model: 'Vehicle A', driver_id: 1, type: 'Car', capacity: '5', plate: 'ABC-1234', creation_date: new Date() },
                    { id: 2, model: 'Vehicle B', driver_id: 1, type: 'Truck', capacity: '10', plate: 'XYZ-5678', creation_date: new Date() },
                    { id: 3, model: 'Vehicle C', driver_id: 1, type: 'Van', capacity: '8', plate: 'LMN-4321', creation_date: new Date() }
                ]
            };
        }
        return {
            totalPages: 1,
            totalItems: 5,
            currentPage: input.page || 1,
            items: [
                { id: 4, model: 'Vehicle D', driver_id: 2, type: 'Motorcycle', capacity: '2', plate: 'OPQ-8765', creation_date: new Date() },
                { id: 5, model: 'Vehicle E', driver_id: 2, type: 'Car', capacity: '5', plate: 'RST-2345', creation_date: new Date() }
            ]
        };
    }
}

describe('VehicleQueryService', () => {
    let vehicleQueryService: VehicleQueryService;
    let vehicleQueryDaoFake: VehicleQueryDaoFake;

    beforeEach(() => {
        vehicleQueryDaoFake = new VehicleQueryDaoFake();
        vehicleQueryService = new VehicleQueryService(vehicleQueryDaoFake);
    });

    it('should return paginated vehicles for driverId 1', async () => {
        const input = { driverId: 1, page: 1, pageSize: 10 };
        const result = await vehicleQueryService.listVehiclesByDriverFromCompanyPaginated(input);

        expect(result).toEqual({
            total_pages: 2,
            total_items: 15,
            current_page: 1,
            items: [
                { id: 1, model: 'Vehicle A', driver_id: 1, type: 'Car', capacity: '5', plate: 'ABC-1234', creation_date: expect.any(Date) },
                { id: 2, model: 'Vehicle B', driver_id: 1, type: 'Truck', capacity: '10', plate: 'XYZ-5678', creation_date: expect.any(Date) },
                { id: 3, model: 'Vehicle C', driver_id: 1, type: 'Van', capacity: '8', plate: 'LMN-4321', creation_date: expect.any(Date) }
            ]
        });
    });

    it('should return paginated vehicles for driverId 2', async () => {
        const input = { driverId: 2, page: 1, pageSize: 10 };
        const result = await vehicleQueryService.listVehiclesByDriverFromCompanyPaginated(input);

        expect(result).toEqual({
            total_pages: 1,
            total_items: 5,
            current_page: 1,
            items: [
                { id: 4, model: 'Vehicle D', driver_id: 2, type: 'Motorcycle', capacity: '2', plate: 'OPQ-8765', creation_date: expect.any(Date) },
                { id: 5, model: 'Vehicle E', driver_id: 2, type: 'Car', capacity: '5', plate: 'RST-2345', creation_date: expect.any(Date) }
            ]
        });
    });

    it('should return default page and pageSize if not provided', async () => {
        const input = { driverId: 1 };
        const result = await vehicleQueryService.listVehiclesByDriverFromCompanyPaginated(input);

        expect(result).toEqual({
            total_pages: 2,
            total_items: 15,
            current_page: 1,
            items: [
                { id: 1, model: 'Vehicle A', driver_id: 1, type: 'Car', capacity: '5', plate: 'ABC-1234', creation_date: expect.any(Date) },
                { id: 2, model: 'Vehicle B', driver_id: 1, type: 'Truck', capacity: '10', plate: 'XYZ-5678', creation_date: expect.any(Date) },
                { id: 3, model: 'Vehicle C', driver_id: 1, type: 'Van', capacity: '8', plate: 'LMN-4321', creation_date: expect.any(Date) }
            ]
        });
    });
});
