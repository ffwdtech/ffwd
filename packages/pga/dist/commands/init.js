import { FILE_NAME } from '@ffwd/config';
import { createMigrationTable } from '../lib/createMigrationTable';
import path from 'path';
import readlineSync from 'readline-sync';
import { ensureDirSync, existsSync, writeFileSync } from 'fs-extra';
const SKEL = ['extensions', 'migrations', 'relations', 'schemas', 'seeds'];
export async function initCmd(folder) {
    try {
        let _path;
        if (!folder) {
            _path = readlineSync.question('Database data path relative to current folder (leave empty for default- ./db): ');
        }
        if (!_path) {
            console.log('Using default path');
            _path = './db';
        }
        const baseDir = path.join(process.cwd(), _path);
        console.log(`Ensuring ${baseDir} exists`);
        ensureDirSync(baseDir);
        console.log('Creating skeleton folders..');
        SKEL.forEach((s) => {
            // Create all the data skeleton folders
            const ss = path.join(baseDir, 'data/', s);
            console.log(`Creating ${ss}`);
            ensureDirSync(ss);
        });
        // Create tests directory
        const testsDir = path.join(baseDir, 'tests/');
        console.log(`Creating ${testsDir}`);
        ensureDirSync(testsDir);
        // Create migration table
        try {
            await createMigrationTable();
        }
        catch (err) {
            console.error(err);
        }
        // Create ffwd.json
        const configLocation = path.join(process.cwd(), FILE_NAME);
        if (!existsSync(configLocation)) {
            console.log('Creating ffwd.json..');
            writeFileSync(configLocation, `{
  "dataDir": "${path.relative(process.cwd(), path.join(baseDir, 'data/'))}",
  "pgConfig": {
    "bigIntMode": "number"
  }
}`);
        }
        console.log('Done!');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
//# sourceMappingURL=init.js.map