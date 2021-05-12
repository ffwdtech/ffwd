import { asyncForEach } from '@ffwd/util';
import { db, sql } from '@ffwd/db';
export async function dropCmd(tables) {
    console.log('Dropping tables:', tables);
    await asyncForEach(tables, async (table) => {
        const sqlQuery = sql `DROP TABLE ${table} CASCADE`;
        console.log(sqlQuery);
        await db.query(sqlQuery);
        console.log('Done!');
    });
    process.exit(0);
}
//# sourceMappingURL=drop.js.map