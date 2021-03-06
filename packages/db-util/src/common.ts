import { processSQLFilesFromDirectory } from './processSQLFilesFromDirectory';

/**
 * Run SQL commands from a directory. Takes in a type so user is informed about what is going on via console.log.
 * @param {string} type - Human-readable type of directory we're reading (seeds, table schemas, extensions)
 * @param {string} directory - Path to read from
 * @param {string[]} items - Optional items to ONLY run
 * @param {object} opts - Options
 * @param {boolean} opts.all - Creates all items in directory
 * @returns {boolean}
 */
export const runCommandsFromDirectory = async function (
  type: string,
  directory: string,
  items: string[],
  opts: { all: boolean; ignoreExistingTables: boolean },
) {
  if (opts && opts.all) {
    console.log(`Creating all ${type} from ${directory}..`);
  } else {
    if (!items.length) {
      console.log(
        `Pass either a list of ${type} separated by spaces or --all to create everything defined in the ${type} folder.`,
      );
      return false;
    }
    console.log(`Creating ${type} ${items.join(',')} from ${directory}..`);
  }

  return await processSQLFilesFromDirectory(directory, {
    specificItems: items || [],
    ignoreExistingTables: opts.ignoreExistingTables
      ? opts.ignoreExistingTables
      : false,
  });
};

/**
 * Creates table relations from the passed relations directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional table relations to ONLY create
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all table relations
 * @returns {boolean}
 */
export async function createRelations(
  directory: string,
  items: string[],
  opts: { all: boolean },
) {
  return await runCommandsFromDirectory('table relations', directory, items, {
    all: opts.all,
    ignoreExistingTables: false,
  });
}

/**
 * Creates table seeds from the passed seeds directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional tables to ONLY seed
 * @param {object} opts - Options
 * @param {boolean} opts.all - Seed all tables
 * @returns {boolean}
 */
export async function seedTables(
  directory: string,
  items: string[],
  opts: { all: boolean },
) {
  return await runCommandsFromDirectory('table seeds', directory, items, {
    all: opts.all,
    ignoreExistingTables: false,
  });
}

/**
 * Creates tables from the passed schemas directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional tables to ONLY seed
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all tables
 * @returns {boolean}
 */
export async function createTables(
  directory: string,
  items: string[],
  opts: { all: boolean; ignoreExistingTables: boolean },
) {
  return await runCommandsFromDirectory('table schemas', directory, items, {
    all: opts.all,
    ignoreExistingTables: opts.ignoreExistingTables,
  });
}

/**
 * Creates extensions from the passed extensions directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional extensions to ONLY create
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all extensions
 * @returns {boolean}
 */
export async function createExtensions(
  directory: string,
  items: string[],
  opts: { all: boolean },
) {
  return await runCommandsFromDirectory('extensions', directory, items, {
    all: opts.all,
    ignoreExistingTables: false,
  });
}
