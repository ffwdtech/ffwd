require('dotenv').config();

import { dropCmd } from './commands/drop';
import { initCmd } from './commands/init';
import { listCmd } from './commands/list';
import { migrateCmd } from './commands/migrate';
import { program } from './lib/program';
import { rmCmd } from './commands/rm';

import { createCmd, extCmd, relCmd, seedCmd } from './commands/common';

program
  .command('init [folder]')
  .description(
    'Initialise a new project- creates the database skeleton folders, tests bootstrap folder and pga.json. Pass an optional folder to skip prompting it.',
  )
  .action(initCmd);

program
  .command('list')
  .description('List available tables to create or seed')
  .action(listCmd);

program
  .command('extensions [extensions...]')
  .alias('ext')
  .alias('e')
  .option(
    '-a, --all',
    'Create all extensions available in the extensions directory.',
  )
  .description('Creates postgres extensions')
  .action(extCmd);

program
  .command('create [tables...]')
  .alias('c')
  .option(
    '-a, --all',
    'Create all the tables defined in the schemas folder. Will not try to create duplicate tables.',
  )
  .description('Create table(s) from the schemas folder')
  .action(createCmd);

program
  .command('relations [tables...]')
  .alias('rel')
  .alias('r')
  .option(
    '-a, --all',
    'Create all relations available in the relations directory.',
  )
  .description('Create table relations')
  .action(relCmd);

program
  .command('seed [tables...]')
  .alias('s')
  .option(
    '-a, --all',
    'Run all insert statements for all available tables in the seeds directory. Executing this on an existing database can create duplicate data.',
  )
  .description('Seed data to table(s) from the seeds folder.')
  .action(seedCmd);

program
  .command('rm <table_name> [primary_keys...]')
  .option('-a, --all', 'Remove all rows in table')
  .description(
    'Remove a row (or all rows) from a table. If you have a string-based enum table, just use the primary key value.',
  )
  .action(rmCmd);

program
  .command('drop <tables...>')
  .alias('d')
  .description('Drop table(s) from the database.')
  .action(dropCmd);

program
  .command('migrate [number]')
  .alias('m')
  .option('-l, --latest', 'Migrate all the way to the latest migration')
  .option('-s, --skip <numbers..>', 'Skip migration(s)')
  .option(
    '-f --force <number>',
    'Force update the migration number in the database without processing any migration files',
  )
  .description('Migrate data.')
  .action(migrateCmd);

program.parse(process.argv);
