import CompanyApplicationDao from '../../../../@core/company/application/dao/company';
import DriverDao from '../../../../@core/driver/application/dao/driver';
import MySqlRepository from '../repositories/mysql-repository';

export default class DriveryMySqlApplicationDaoAdapter extends MySqlRepository implements DriverDao {
    async doesDriverExistById(id: number): Promise<boolean> {
        const [firstRow] = await this.mysql.query({
            statement: 'SELECT d.id FROM driver d WHERE d.id = ?',
            params: [id]
        });

        return Boolean(firstRow);
    }
}
