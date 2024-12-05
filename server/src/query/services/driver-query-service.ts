import DriverQueryDao, { DriverNameAndId } from '../dao/protocols/driver';

export default class DriverQueryService {
    constructor(
        private readonly driverQueryDao: DriverQueryDao
    ) {}

    async getAllDriversNamesByCompanyId(companyId: number): Promise<Array<DriverNameAndId>> {
        return await this.driverQueryDao.getAllDriversNamesByCompanyId(companyId);
    }
}
