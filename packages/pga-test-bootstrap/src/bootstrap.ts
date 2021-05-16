import { getAllDirectories } from '@ffwd/config';

import {
  createExtensions,
  createRelations,
  createTables,
  runCommandsFromDirectory,
  seedTables,
} from '@ffwd/db-util';

/**
 * This sets up the database for tests- it creates the tables in CREATE_DIR and
 * seeds them from files in SEED_DIR.
 */
async function setupDatabase() {
  const dirs = getAllDirectories();
  console.log('--------------------------------------------------------------');
  console.log('Creating extensions..');
  await createExtensions(dirs.extensions, [], { all: true });
  console.log('--------------------------------------------------------------');
  console.log('Creating from schemas..');
  await createTables(dirs.schemas, [], {
    all: true,
    ignoreExistingTables: true,
  });
  console.log('--------------------------------------------------------------');
  console.log('Creating table relations..');
  await createRelations(dirs.relations, [], { all: true });
  console.log('--------------------------------------------------------------');
  console.log('Migrating..');
  await runCommandsFromDirectory('migrations', dirs.migrations, [], {
    all: true,
    ignoreExistingTables: false,
  });
  console.log('--------------------------------------------------------------');
  console.log('Seeding..');
  await seedTables(dirs.seeds, [], { all: true });
  return;
}

(async () => {
  try {
    console.error('Bootstrapping database..');
    console.error('DATABASE_URL:', process.env.DATABASE_URL);
    await setupDatabase();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
