
import DriverQueryDao, { DriverNameAndId } from '../dao/protocols/driver';
import DriverQueryService from './driver-query-service';

class DriverQueryDaoFake implements DriverQueryDao {
    async getAllDriversNamesByCompanyId(companyId: number): Promise<Array<DriverNameAndId>> {
        if (companyId === 1) {
            return [
                { name: 'Driver A', id: 1 },
                { name: 'Driver B', id: 2 }
            ];
        } else if (companyId === 2) {
            return [
                { name: 'Driver C', id: 3 },
                { name: 'Driver D', id: 4 }
            ];
        }
        return [];
    }
}

describe('DriverQueryService', () => {
    let driverQueryService: DriverQueryService;
    let driverQueryDaoFake: DriverQueryDaoFake;

    beforeEach(() => {
        driverQueryDaoFake = new DriverQueryDaoFake();
        driverQueryService = new DriverQueryService(driverQueryDaoFake);
    });

    it('should return drivers names and ids for companyId 1', async () => {
        const result = await driverQueryService.getAllDriversNamesByCompanyId(1);

        expect(result).toEqual([
            { name: 'Driver A', id: 1 },
            { name: 'Driver B', id: 2 }
        ]);
    });

    it('should return drivers names and ids for companyId 2', async () => {
        const result = await driverQueryService.getAllDriversNamesByCompanyId(2);

        expect(result).toEqual([
            { name: 'Driver C', id: 3 },
            { name: 'Driver D', id: 4 }
        ]);
    });

    it('should return an empty array for an unknown companyId', async () => {
        const result = await driverQueryService.getAllDriversNamesByCompanyId(999);

        expect(result).toEqual([]);
    });
});
