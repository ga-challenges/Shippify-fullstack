import { IncrementID } from '../../../@core/commom/domain/building-blocks/value-objects/id';
import Vehicle from '../../../@core/vehicle/domain/models/vehicle';
import VehicleRepository from '../../../@core/vehicle/domain/repository/vechile';

export default class VehicleRepositoryInMemoryAdapter implements VehicleRepository {
    private vehicles: Map<number, Vehicle> = new Map();
    private idCounter: number = 1;

    async getById(id: number): Promise<Vehicle | null> {
        const vehicle = this.vehicles.get(id);
        return vehicle || null;
    }

    async save(vehicle: Vehicle): Promise<number> {
        const id = new IncrementID(this.idCounter++);
        this.vehicles.set(id.getValue(), vehicle);
        return id.getValue();
    }
}
