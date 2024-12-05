import Vehicle from '../../../../@core/vehicle/domain/models/vehicle';
import VehicleRepository, { RepositoryOutputVehicleId } from '../../../../@core/vehicle/domain/repository/vechile';
import formatDateForMySQL from './format-date-to-mysql';
import MySqlRepository from './mysql-repository';

export default class VehicleMySqlRepositoryAdapter extends MySqlRepository implements VehicleRepository {
    async save(vehicle: Vehicle): Promise<RepositoryOutputVehicleId> {
        const vehicleJson = vehicle.toJson();

        const [firstRow] = await this.mysql.query<{ insertId: number }>({
            statement: `
                INSERT INTO vehicle (driver_id, plate, model, type, capacity, creation_date) VALUES (?, ?, ?, ?, ?, ?)
            `,
            params: [
                vehicleJson.driverId,
                vehicleJson.plate,
                vehicleJson.model,
                vehicleJson.type,
                vehicleJson.capacity,
                formatDateForMySQL(vehicleJson.creationDate)
            ]
        });

        return firstRow.insertId;
    }
}
