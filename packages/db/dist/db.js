import createConnectionPool, { sql } from '@databases/pg';
// @databases uses DATABASE_URL by default as the connection string
const db = createConnectionPool({
    bigIntMode: 'bigint',
});
const query = db.query;
/**
 * Query the database and return one result.
 * @param {SQLQuery} query - SQL query to use
 * @returns {Promise<any>} Result
 */
export async function queryOne(query) {
    const res = await db.query(query);
    if (res[0])
        return res[0];
    else
        return undefined;
}
/**
 * Check if a table exists in the database
 * @param {string} table - Name of table
 * @returns {boolean}
 */
export async function checkIfTableExists(table) {
    const rows = await db.query(sql.__dangerous__rawValue(`SELECT to_regclass('${table}')`));
    return rows[0].to_regclass === table;
}
export { db, sql, query };
//# sourceMappingURL=db.js.map