import CompanyApplicationDao from '../../../@core/company/application/dao/company';

export default class CompanyApplicationDaoInMemoryAdapter implements CompanyApplicationDao {
    private companiesIds: Set<number> = new Set();
    private companiesNames: Set<string> = new Set();

    addCompanyId(id: number): void {
        this.companiesIds.add(id);
    }

    addCompanyName(name: string): void {
        this.companiesNames.add(name);
    }

    async doesCompanyExistByName(name: string): Promise<boolean> {
        return this.companiesNames.has(name);
    }

    async doesCompanyExistById(id: number): Promise<boolean> {
        return this.companiesIds.has(id);
    }
}
