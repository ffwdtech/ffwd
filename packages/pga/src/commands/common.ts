import { getAllDirectories } from '@ffwd/config';

import {
  createExtensions,
  createRelations,
  createTables,
  seedTables,
} from '@ffwd/db-util';

export async function createCmd(
  tables: string[],
  cmdObj: { all: boolean; ignoreExistingTables: boolean },
) {
  const dirs = getAllDirectories();
  await createTables(dirs.schemas, tables, cmdObj);
  process.exit(0);
}

export async function seedCmd(tables: string[], cmdObj: { all: boolean }) {
  const dirs = getAllDirectories();
  await seedTables(dirs.seeds, tables, cmdObj);
  process.exit(0);
}

export async function extCmd(extensions: string[], cmdObj: { all: boolean }) {
  const dirs = getAllDirectories();
  await createExtensions(dirs.extensions, extensions, cmdObj);
  process.exit(0);
}

export async function relCmd(tables: string[], cmdObj: { all: boolean }) {
  const dirs = getAllDirectories();
  await createRelations(dirs.relations, tables, cmdObj);
  process.exit(0);
}
