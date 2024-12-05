import { IncrementID } from '../../../@core/commom/domain/building-blocks/value-objects/id';
import Driver from '../../../@core/driver/domain/models/driver';
import DriverRepository from '../../../@core/driver/domain/repository/driver';

export default class DriverRepositoryInMemoryAdapter implements DriverRepository {
    private drivers: Map<number, Driver> = new Map();
    private idCounter: number = 1;

    async getById(id: number): Promise<Driver | null> {
        const driver = this.drivers.get(id);
        return driver || null;
    }

    async save(driver: Driver): Promise<number> {
        const id = new IncrementID(this.idCounter++);
        this.drivers.set(id.getValue(), driver);
        return id.getValue();
    }
}
