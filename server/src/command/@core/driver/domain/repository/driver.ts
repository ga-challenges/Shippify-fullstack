import { Repository } from '../../../commom/domain/repository';
import Driver from '../models/driver';

export type RepositoryOutputDriverId = number

interface DriverRepository extends Repository<Driver> {
    save(driver: Driver): Promise<RepositoryOutputDriverId>
}

export default DriverRepository;
