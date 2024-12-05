import { Repository } from '../../../commom/domain/repository';
import Vehicle from '../models/vehicle';

export type RepositoryOutputVehicleId = number

interface VehicleRepository extends Repository<Vehicle> {
    save(vehicle: Vehicle): Promise<RepositoryOutputVehicleId>
}

export default VehicleRepository;
