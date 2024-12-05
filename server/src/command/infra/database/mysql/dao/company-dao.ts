import CompanyApplicationDao from '../../../../@core/company/application/dao/company';
import MySqlRepository from '../repositories/mysql-repository';

export default class CompanyMySqlApplicationDaoAdapter extends MySqlRepository implements CompanyApplicationDao {
    async doesCompanyExistById(id: number): Promise<boolean> {
        const [firstRow] = await this.mysql.query({
            statement: 'SELECT c.id FROM company c WHERE c.id = ?',
            params: [id]
        });

        return Boolean(firstRow);
    }

    async doesCompanyExistByName(name: string): Promise<boolean> {
        const [firstRow] = await this.mysql.query({
            statement: 'SELECT c.name FROM company c WHERE c.name = ?',
            params: [name]
        });

        return Boolean(firstRow);
    }
}
