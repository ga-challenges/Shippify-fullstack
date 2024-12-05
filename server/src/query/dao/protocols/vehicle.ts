import VehicleQueryModel from '../../models/vehicle';
import { PaginatedInput, PaginatedResult } from '../../protocols/query-pagination';

export interface VehicleQueryDaoInput extends PaginatedInput {
    driverId: number
}

interface VehicleQueryDao {
    listVehiclesByDriverFromCompanyPaginated(input: VehicleQueryDaoInput): Promise<PaginatedResult<VehicleQueryModel>>;
}

export default VehicleQueryDao;
