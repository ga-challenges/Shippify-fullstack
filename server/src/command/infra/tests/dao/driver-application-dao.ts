import DriverDao from '../../../@core/driver/application/dao/driver';

export default class DriverDaoInMemoryAdapter implements DriverDao {
    private drivers: Set<number>;

    constructor() {
        this.drivers = new Set<number>();
    }

    addDriver(id: number): void {
        this.drivers.add(id);
    }

    async doesDriverExistById(id: number): Promise<boolean> {
        return this.drivers.has(id);
    }
}
