import MySql from '../../command/infra/database/mysql/mysql';

export default class MySqlQueryDao {
    constructor(
        protected readonly mysql: MySql
    ) {}
}
