import { SQLQuery, sql } from '@databases/pg';
declare const db: import("@databases/pg").ConnectionPool;
declare const query: {
    (query: SQLQuery): Promise<any[]>;
    (query: SQLQuery[]): Promise<any[][]>;
};
export declare type UUID = string;
export declare type ID = UUID;
/**
 * Query the database and return one result.
 * @param {SQLQuery} query - SQL query to use
 * @returns {Promise<any>} Result
 */
export declare function queryOne(query: SQLQuery): Promise<any | undefined>;
/**
 * Check if a table exists in the database
 * @param {string} table - Name of table
 * @returns {boolean}
 */
export declare function checkIfTableExists(table: string): Promise<boolean>;
export { db, sql, query, SQLQuery };
//# sourceMappingURL=db.d.ts.map