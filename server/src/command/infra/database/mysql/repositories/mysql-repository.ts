import MySql from '../mysql';

export default class MySqlRepository {
    constructor(
        protected readonly mysql: MySql
    ) {}
}
