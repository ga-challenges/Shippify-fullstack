import fs from 'fs';
import path from 'path';
import Env from '../../../../config/env';
import MySql2Adapter, { MySQLConnection } from '../../mysql2';
import MySql from '../../mysql';

const migrationsDir = path.join(__dirname, '../../migrations');

async function runMigration(filePath: string, client: MySql) {
    const sql = fs.readFileSync(filePath, 'utf-8');

    const commands = sql.split(';').map(command => command.trim()).filter(command => command.length > 0);

    for (const command of commands) {
        try {
            await client.query({
                params: [],
                statement: command
            });
        } catch (error) {
            console.error('Error executing SQL command:', command);
            console.error(error);
            throw error;
        }
    }
}

async function runMigrations() {
    const connection = MySQLConnection.connect({
        database: Env.get('MYSQL_DATABASE'),
        host: Env.get('MYSQL_HOST'),
        password: Env.get('MYSQL_PASSWORD'),
        port: +Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER')
    });

    const mysqlClient = new MySql2Adapter(connection);

    try {
        await mysqlClient.query({
            statement: `
                CREATE TABLE IF NOT EXISTS migrations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    file_name VARCHAR(255) NOT NULL,
                    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `,
            params: []
        });

        const migrations = await mysqlClient.query<{ fileName: string }>({
            statement: 'SELECT file_name fileName FROM migrations',
            params: []
        });
        const executedFiles = new Set(migrations.map((row) => row.fileName));

        const files = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of files) {
            if (!executedFiles.has(file)) {
                const filePath = path.join(migrationsDir, file);
                await runMigration(filePath, mysqlClient);
                await mysqlClient.query({
                    params: [file],
                    statement: 'INSERT INTO migrations (file_name) VALUES (?)'
                });
                console.log(`Migration "${file}" executed successfully.`);
            }
        }
    } catch (error) {
        console.error('Error running migrations', error);
    }
}

runMigrations();
