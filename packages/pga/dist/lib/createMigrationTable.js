import { line } from './line';
import { sql } from '@databases/pg';
import { checkIfTableExists, db } from '@ffwd/db';
// Left here for future if migrations will move into database versioning.
// If so, then a new version would be 101, etc. Currently it's just fixed at 100.
export const MIGRATION_ID = 100;
export const MIGRATION_TABLE_NAME = 'migration';
export async function createMigrationTable() {
    const exists = await checkIfTableExists(MIGRATION_TABLE_NAME);
    console.log(exists);
    if (!exists) {
        console.log(`Creating migration table ${MIGRATION_TABLE_NAME}..`);
        const t = sql.__dangerous__rawValue(MIGRATION_TABLE_NAME);
        const sqlQuery = sql `
    CREATE TABLE IF NOT EXISTS ${t} (
      id integer PRIMARY KEY,
      current_version integer NOT NULL
    );
    
    COMMENT ON TABLE ${t} IS 'Database migrations';
    
    CREATE UNIQUE INDEX IF NOT EXISTS ${t}_pkey1 ON "${t}"(id int4_ops);

    INSERT INTO ${t} (id, current_version) VALUES (${MIGRATION_ID}, '0');
    `;
        line();
        console.log(sqlQuery);
        line();
        await db.query(sqlQuery);
        console.log('Done');
    }
    else {
        console.log('Migration table exists already');
    }
}
//# sourceMappingURL=createMigrationTable.js.map