const { db } = require('@ffwd/db');
const asyncForEach = require('@ffwd/util');

export async function rmCmd(
  table: string,
  keys: string[],
  cmdObj: { all: boolean },
) {
  const query = db.query;
  if (cmdObj.all) {
    const sql = `DELETE FROM ${table}`;
    console.log(sql);
    await query(sql);
    console.log('Done!');
    process.exit(0);
  } else {
    if (!keys) {
      console.log(
        'No keys provided, if you want to clear the whole table use --all',
      );
      process.exit(0);
    }
  }

  const sql = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}'`;
  const { rows } = await query(sql);

  let idField: any;

  if (rows.find((row: any) => row.column_name === 'id')) {
    idField = 'id';
  } else if (rows.find((row: any) => row.column_name === 'value')) {
    idField = 'value';
  }

  if (!idField) {
    console.log('Could not find a primary key column (id or value)');
  }

  console.log('Removing keys:', keys);

  await asyncForEach(keys, async (key: any) => {
    const delsql = `DELETE FROM ${table} WHERE ${idField}='${key}'`;
    console.log(delsql);
    await query(delsql);
  });

  process.exit(0);
}
