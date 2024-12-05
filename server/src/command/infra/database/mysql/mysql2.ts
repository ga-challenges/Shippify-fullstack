import MySql from './mysql';
import mysql2 from 'mysql2/promise';

export default class MySql2Adapter implements MySql {
    constructor(private connection: mysql2.Connection) {}

    async query<T>(input: { statement: string; params?: Array<unknown> }): Promise<Array<T>> {
        const [rows]: [any, mysql2.FieldPacket[]] = await this.connection.execute(input.statement, input.params);

        if (rows && typeof rows.insertId === 'number') {
            return [{ insertId: rows.insertId } as unknown as T];
        }

        return rows as T[];
    }
}


interface Connection {
    database: string,
    host: string,
    password: string,
    port: number
    user: string
}

export class MySQLConnection {
    static connect(input: Connection) {
        return mysql2.createPool(input);
    }
}
