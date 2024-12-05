import fs from 'fs';
import path from 'path';
import Env from '../../../../config/env';
import MySql from '../../mysql';
import MySql2Adapter, { MySQLConnection } from '../../mysql2';

const seedersDir = path.join(__dirname, '../../seeders');

async function runSeeder(filePath: string, client: MySql) {
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

async function runSeeders() {
    const pool = MySQLConnection.connect({
        database: Env.get('MYSQL_DATABASE'),
        host: Env.get('MYSQL_HOST'),
        password: Env.get('MYSQL_PASSWORD'),
        port: +Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER')
    });

    const mysqlClient = new MySql2Adapter(pool);

    try {
        await mysqlClient.query({
            statement: `
                CREATE TABLE IF NOT EXISTS seeders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    file_name VARCHAR(255) NOT NULL,
                    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `,
            params: []
        });

        const seeders = await mysqlClient.query<{ fileName: string }>({
            statement: 'SELECT file_name fileName FROM seeders',
            params: []
        });
        const executedFiles = new Set(seeders.map((row) => row.fileName));

        const files = fs.readdirSync(seedersDir)
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of files) {
            if (!executedFiles.has(file)) {
                const filePath = path.join(seedersDir, file);
                await runSeeder(filePath, mysqlClient);
                await mysqlClient.query({
                    params: [file],
                    statement: 'INSERT INTO seeders (file_name) VALUES (?)'
                });
                console.log(`Seeder "${file}" executed successfully.`);
            }
        }
    } catch (error) {
        console.error('Error running seeders', error);
    } finally {
        await pool.end();
    }
}

runSeeders();
