import { getAllDirectories } from '@ffwd/config';
import { line } from '../lib/line';
import { readFiles } from '@ffwd/util';
export async function listCmd() {
    const dirs = getAllDirectories();
    const extensionFiles = await readFiles(dirs.extensions, '.sql');
    const createFiles = await readFiles(dirs.schemas, '.sql');
    const seedFiles = await readFiles(dirs.seeds, '.sql');
    const relationFiles = await readFiles(dirs.relations, '.sql');
    const migrationFiles = await readFiles(dirs.migrations, '.sql');
    console.log('\nExtensions to create:\n');
    extensionFiles.forEach((f) => {
        console.log(`- ${f.name} (${f.path})`);
    });
    line();
    console.log('\nTables available for creation:\n');
    createFiles.forEach((f) => {
        console.log(`- ${f.name} (${f.path})`);
    });
    line();
    console.log('\nTables available for seeding:\n');
    seedFiles.forEach((f) => {
        console.log(`- ${f.name} (${f.path})`);
    });
    line();
    console.log('\nTables available for relations:\n');
    relationFiles.forEach((f) => {
        console.log(`- ${f.name} (${f.path})`);
    });
    line();
    console.log('\nMigrations available:\n');
    migrationFiles.forEach((f) => {
        console.log(`- ${f.name} (${f.path})`);
    });
    return;
}
//# sourceMappingURL=list.js.map