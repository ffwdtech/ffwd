import { readFiles } from '@ffwd/util';

import { checkIfTableExists, db, sql } from '@ffwd/db';

/**
 * Takes in a directory and runs all the queries in .sql files inside that directory.
 * @param {string} directory - Directory to read from
 * @param {Object} options - Options
 * @param {string[]} options.specificItems - Specify items to process from the directory. Ignores the rest.
 * @param {boolean} options.ignoreExistingTables - Ignores existing tables (use when creating tables).
 * @returns {boolean} True if successful
 */
export async function processSQLFilesFromDirectory(
  directory: string,
  {
    specificItems,
    ignoreExistingTables,
    debug,
  }: {
    specificItems?: string[];
    ignoreExistingTables?: boolean;
    debug?: boolean;
  },
) {
  // This is for running tests - need to use .error to show logging output in pg-test..
  let log: any;
  if (debug) log = console.error;
  else log = console.log;

  const files = await readFiles(directory, '.sql');
  let fileNames = files.map((a: any) => a.name);

  if (specificItems && specificItems.length) {
    fileNames = fileNames.filter(
      (name: string) => specificItems.indexOf(name) > -1,
    );
  }

  let filesToProcess = fileNames;

  if (ignoreExistingTables) {
    filesToProcess = [];

    for (const name of fileNames) {
      const tableExists = await checkIfTableExists(name);
      if (!tableExists) {
        filesToProcess.push(name);
      } else {
        console.error(`Table ${name} exists already`);
      }
    }
  }

  if (!filesToProcess.length) {
    console.error('No files to process');
    return false;
  }
  log('Files to process: ', filesToProcess.join(','));

  for (const name of filesToProcess) {
    const file = files.find((f: any) => f.name === name);
    log(`File: ${name} - Path: ${file.path}`);
    const fileContents = sql.file(file.path);
    log(fileContents);
    await db.query(fileContents);
  }

  return true;
}
