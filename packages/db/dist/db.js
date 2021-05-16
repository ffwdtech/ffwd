import { getConfig } from '@ffwd/config';
import createConnectionPool, { sql } from '@databases/pg';
// @databases uses DATABASE_URL by default as the connection string
const config = getConfig();
const db = createConnectionPool(config && config.pgConfig ? config.pgConfig : {});
const query = db.query;
/**
 * Check if a table exists in the database
 * @param {string} table - Name of table
 * @returns {boolean}
 */
export async function checkIfTableExists(table) {
    const rows = await db.query(sql.__dangerous__rawValue(`SELECT to_regclass('${table}')`));
    return rows[0].to_regclass !== null;
}
export { db, sql, query };
//# sourceMappingURL=db.js.map