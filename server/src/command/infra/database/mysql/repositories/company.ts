import Company from '../../../../@core/company/domain/models/company';
import CompanyRepository from '../../../../@core/company/domain/repository/company-repository';
import formatDateForMySQL from './format-date-to-mysql';
import MySqlRepository from './mysql-repository';

export default class CompanyMySqlRepositoryAdapter extends MySqlRepository implements CompanyRepository {
    async save(company: Company): Promise<number> {
        const companyJson = company.toJson();
        
        const result = await this.mysql.query<{ insertId: number }>({
            statement: `
                INSERT INTO company (name, status, city, plan_type, creation_date) VALUES (?, ?, ?, ?, ?)
            `,
            params: [
                companyJson.name,
                companyJson.status,
                companyJson.city,
                companyJson.planType,
                formatDateForMySQL(companyJson.creationDate)
            ]
        });
        
        const insertId = result[0]?.insertId;

        return insertId;
    }
}
