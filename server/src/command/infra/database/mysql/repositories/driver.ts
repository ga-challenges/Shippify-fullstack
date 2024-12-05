import Driver from '../../../../@core/driver/domain/models/driver';
import DriverRepository, { RepositoryOutputDriverId } from '../../../../@core/driver/domain/repository/driver';
import formatDateForMySQL from './format-date-to-mysql';
import MySqlRepository from './mysql-repository';

export default class DriverMySqlRepositoryAdapter extends MySqlRepository implements DriverRepository {
    async save(driver: Driver): Promise<RepositoryOutputDriverId> {
        const driverJson = driver.toJson();

        const [firstRow] = await this.mysql.query<{ insertId: number }>({
            statement: `
                INSERT INTO driver (company_id, first_name, last_name, email, phone, avatar_url, status, city, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            params: [
                driverJson.companyId,
                driverJson.name.split(' ')[0],
                driverJson.name.split(' ').slice(1).join(' ') || '',
                driverJson.email,
                driverJson.phone,
                driverJson.avatarUrl,
                driverJson.status,
                driverJson.city,
                formatDateForMySQL(driverJson.creationDate)
            ]
        });

        return firstRow.insertId;
    }
}
