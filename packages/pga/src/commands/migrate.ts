import { MIGRATION_ID } from '../lib/createMigrationTable';
import { line } from '../lib/line';

import { asyncForEach, readFiles } from '@ffwd/util';
import { db, sql } from '@ffwd/db';

export async function migrateCmd(
  migrationNumber: any,
  cmdObj: { force: any; latest: any; skip: any },
) {
  //
  // Force a version change
  //

  if (cmdObj.force) {
    console.log(
      `Setting migration number to ${cmdObj.force} without running any migrations.`,
    );
    await db.query(
      sql`UPDATE migration SET current_version='${parseInt(
        cmdObj.force,
      )}' WHERE id=${MIGRATION_ID}`,
    );
    process.exit(0);
  }

  migrationNumber = parseInt(migrationNumber);

  const rows = await db.query(
    sql`SELECT * FROM migration WHERE id=${MIGRATION_ID}`,
  );
  const currentMigrationNumber = rows && rows[0] ? rows[0].current_version : -1;

  const migrationFiles = (
    await readFiles(`${process.cwd()}/data/migrate/`, '.sql')
  )
    .map((file: any) => {
      file.migrationNumber = parseInt(file.name.split('-')[0]);
      return file;
    })
    .sort((a: any, b: any) => {
      if (a.migrationNumber > b.migrationNumber) return 1;
      if (b.migrationNumber > a.migrationNumber) return -1;
      return 0;
    });

  line();

  const lastMigrationNumber =
    migrationFiles[migrationFiles.length - 1].migrationNumber;

  console.log(`Current version:          ${currentMigrationNumber}`);

  //
  // Update to latest
  //

  if (cmdObj.latest) {
    migrationNumber = lastMigrationNumber;
  } else if (
    migrationNumber === undefined ||
    migrationNumber === null ||
    Number.isNaN(migrationNumber)
  ) {
    console.log(
      'No version provided.\nIf you want to migrate to the latest version, use ./dba migrate --latest',
    );
    process.exit(0);
  }

  console.log(`Migrating to version:     ${migrationNumber}`);
  console.log(`Latest version available: ${lastMigrationNumber}`);
  line();

  if (lastMigrationNumber < migrationNumber) {
    console.log(
      `Latest migration is ${lastMigrationNumber}, can't migrate to ${migrationNumber}`,
    );
    process.exit(0);
  }

  if (lastMigrationNumber === currentMigrationNumber) {
    console.log(`Already at migration ${migrationNumber}`);
    process.exit(0);
  }

  console.log('Migrations:');

  migrationFiles.forEach((file: any) => {
    console.log(
      file.migrationNumber,
      file.name,
      file.migrationNumber === currentMigrationNumber ? ' <- current' : '',
      file.migrationNumber === migrationNumber ? ' <- updating to this' : '',
    );
  });

  line();

  cmdObj.skip = cmdObj.skip
    ? cmdObj.skip.split(',').filter((s: any) => !Number.isNaN(parseInt(s)))
    : undefined;

  await asyncForEach(migrationFiles, async (file) => {
    let skipped =
      cmdObj.skip &&
      cmdObj.skip.find((s: any) => {
        return parseInt(s) === file.migrationNumber;
      });

    if (skipped) {
      console.log(`Skipping migration ${file.migrationNumber} (${file.name})`);
    }

    if (
      file.migrationNumber <= migrationNumber &&
      file.migrationNumber > currentMigrationNumber &&
      !skipped
    ) {
      try {
        console.log(`Migration ${file.migrationNumber} (${file.name}):`);
        console.log(file.content);
        await db.query(file.content);
        line();
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
      await db.query(
        sql`UPDATE migration SET current_version='${file.migrationNumber}' WHERE id=${MIGRATION_ID}`,
      );
      console.log(
        'Updating current migration in database to ' + file.migrationNumber,
      );
    }
  });

  process.exit(0);
}
