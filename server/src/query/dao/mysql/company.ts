import CompanyQueryDao, { CompanyNameAndId } from '../protocols/company';
import MySqlQueryDao from '../query-dao';

export default class CompanyMySqlQueryDaoAdapter extends MySqlQueryDao implements CompanyQueryDao {
    async getAllCompanyNamesAndId(): Promise<Array<CompanyNameAndId>> {
        const result = await this.mysql.query<{ name: string, id: number }>({
            statement: 'SELECT name, id FROM company'
        });

        return result;
    }
}
