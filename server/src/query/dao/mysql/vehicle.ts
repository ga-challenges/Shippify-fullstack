import VehicleQueryModel from '../../models/vehicle';
import { PaginatedResult } from '../../protocols/query-pagination';
import VehicleQueryDao, { VehicleQueryDaoInput } from '../protocols/vehicle';
import MySqlQueryDao from '../query-dao';
import { calculateOffsetPage } from './calculate-offset-page';

export default class VehicleMySQLAdapterQueryDao extends MySqlQueryDao implements VehicleQueryDao {
    async listVehiclesByDriverFromCompanyPaginated(input: VehicleQueryDaoInput): Promise<PaginatedResult<VehicleQueryModel>> {
        const offset = calculateOffsetPage(input);
        const items = await this.mysql.query<VehicleQueryModel>({
            statement: `
                SELECT 
                    id, 
                    driver_id, 
                    type, 
                    capacity, 
                    model, 
                    plate, 
                    creation_date 
                FROM 
                    vehicle
                WHERE 
                    driver_id = ? 
                LIMIT ${input.pageSize} OFFSET ${offset};
            `,
            params: [input.driverId]
        });

        const [{ totalItems }] = await this.mysql.query<{ totalItems: number }>({
            statement: 'SELECT COUNT(1) as totalItems FROM vehicle WHERE driver_id = ?',
            params: [input.driverId]
        });

        return {
            currentPage: input.page,
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / input.pageSize)
        };
    }
}
