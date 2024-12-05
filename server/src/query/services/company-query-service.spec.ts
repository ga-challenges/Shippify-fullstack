
import CompanyQueryDao, { CompanyNameAndId } from '../dao/protocols/company';
import CompanyQueryService from './company-query-service';

class CompanyQueryDaoFake implements CompanyQueryDao {
    async getAllCompanyNamesAndId(): Promise<Array<CompanyNameAndId>> {
        return [
            { name: 'Company A', id: 1 },
            { name: 'Company B', id: 2 }
        ];
    }
}

describe('CompanyQueryService', () => {
    let companyQueryService: CompanyQueryService;
    let companyQueryDaoFake: CompanyQueryDaoFake;

    beforeEach(() => {
        companyQueryDaoFake = new CompanyQueryDaoFake();
        companyQueryService = new CompanyQueryService(companyQueryDaoFake);
    });

    it('should return all company names and ids', async () => {
        const result = await companyQueryService.getAllCompanyNamesAndId();

        expect(result).toEqual([
            { name: 'Company A', id: 1 },
            { name: 'Company B', id: 2 }
        ]);
    });
});
