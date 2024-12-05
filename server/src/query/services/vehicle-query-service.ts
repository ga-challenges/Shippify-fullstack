import VehicleQueryDao, { VehicleQueryDaoInput } from '../dao/protocols/vehicle';

interface GetVehiclesInput extends Partial<VehicleQueryDaoInput> {
    driverId: number;
}

export default class VehicleQueryService {
    constructor(
        private readonly vehicleQueryDao: VehicleQueryDao
    ) {}

    async listVehiclesByDriverFromCompanyPaginated({ driverId, page = 1, pageSize= 10 }: GetVehiclesInput) {
        const vehicles = await this.vehicleQueryDao.listVehiclesByDriverFromCompanyPaginated({
            driverId,
            page: page || 1,
            pageSize: pageSize || 10
        });

        return {
            total_pages: vehicles.totalPages,
            total_items: vehicles.totalItems,
            current_page: vehicles.currentPage,
            items: vehicles.items
        };
    }
}
