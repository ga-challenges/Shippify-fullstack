import DriverQueryDao, { DriverNameAndId } from '../protocols/driver';
import MySqlQueryDao from '../query-dao';

export default class DriverMySqlQueryDaoAdapter extends MySqlQueryDao implements DriverQueryDao {
    async getAllDriversNamesByCompanyId(companyId: number): Promise<Array<DriverNameAndId>> {
        const result = await this.mysql.query<DriverNameAndId>({
            statement: 'SELECT CONCAT(d.first_name, d.last_name) as name, id FROM driver d WHERE d.company_id = ?',
            params: [companyId]
        });

        return result;
    }
}
