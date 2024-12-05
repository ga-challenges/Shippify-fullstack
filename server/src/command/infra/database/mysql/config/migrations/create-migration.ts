import fs from 'fs';
import path from 'path';
import prompts from 'prompts';

async function createMigration() {
    const response = await prompts({
        type: 'text',
        name: 'migrationName',
        message: 'Enter the migration name',
        validate: (input: string) => input ? true : 'Migration name cannot be empty.'
    });

    const migrationName = response.migrationName;
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileName = `${timestamp}_${migrationName}.sql`;
    const migrationsDir = path.join(__dirname, '../../migrations');

    if (!fs.existsSync(migrationsDir)) {
        fs.mkdirSync(migrationsDir);
    }

    const filePath = path.join(migrationsDir, fileName);

    fs.writeFileSync(filePath, '-- SQL script goes here\n');
    console.log(`Migration "${fileName}" created successfully.`);
}

createMigration();
