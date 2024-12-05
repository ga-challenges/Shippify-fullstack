import Company from '../models/company';

interface CompanyRepository {
    save(company: Company): Promise<number>
}

export default CompanyRepository;
