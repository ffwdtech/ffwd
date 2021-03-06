import { asyncForEach } from '@ffwd/util';

import { db, sql } from '@ffwd/db';

export async function dropCmd(tables: string[]) {
  console.log('Dropping tables:', tables);

  await asyncForEach(tables, async (table) => {
    const sqlQuery = sql.__dangerous__rawValue(`DROP TABLE ${table} CASCADE`);
    console.log(sqlQuery);
    await db.query(sqlQuery);
    console.log('Done!');
  });

  process.exit(0);
}
