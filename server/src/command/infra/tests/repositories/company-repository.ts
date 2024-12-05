import { IncrementID } from '../../../@core/commom/domain/building-blocks/value-objects/id';
import Company from '../../../@core/company/domain/models/company';
import CompanyRepository from '../../../@core/company/domain/repository/company-repository';

export default class CompanyRepositoryInMemoryAdapter implements CompanyRepository {
    private companies: Map<number, Company> = new Map();
    private idCounter: number = 1;

    async getById(id: number): Promise<Company | null> {
        const company = this.companies.get(id);
        return company || null;
    }

    async save(company: Company): Promise<number> {
        const id = new IncrementID(this.idCounter++);
        this.companies.set(id.getValue(), company);
        return id.getValue();
    }
}
