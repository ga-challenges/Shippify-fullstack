import CompanyQueryDao, { CompanyNameAndId } from '../dao/protocols/company';

export default class CompanyQueryService {
    constructor(
        private readonly companyQueryDao: CompanyQueryDao
    ) {}

    async getAllCompanyNamesAndId(): Promise<Array<CompanyNameAndId>> {
        return await this.companyQueryDao.getAllCompanyNamesAndId();
    }
}
