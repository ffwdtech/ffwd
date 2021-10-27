import { processSQLFilesFromDirectory } from './processSQLFilesFromDirectory';
/**
 * Run SQL commands from a directory. Takes in a type so user is informed about what is going on via console.log.
 * @param {string} type - Human-readable type of directory we're reading (seeds, table schemas, extensions)
 * @param {string} directory - Path to read from
 * @param {string[]} items - Optional items to ONLY run
 * @param {object} opts - Options
 * @param {boolean} opts.all - Creates all items in directory
 * @param {boolean} opts.ignoreExistingTables - Ignore processing files relating to tables that already exist
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export const runCommandsFromDirectory = async function (type, directory, items, opts) {
    // This is for running tests - need to use .error to show logging output in pg-test..
    let log;
    if (opts.debug)
        log = console.error;
    else
        log = console.log;
    if (opts && opts.all) {
        log(`Creating all ${type} from ${directory}..`);
    }
    else {
        if (!items.length) {
            log(`Pass either a list of ${type} separated by spaces or --all to create everything defined in the ${type} folder.`);
            return false;
        }
        log(`Creating ${type} ${items.join(',')} from ${directory}..`);
    }
    return await processSQLFilesFromDirectory(directory, {
        specificItems: items || [],
        ignoreExistingTables: opts.ignoreExistingTables
            ? opts.ignoreExistingTables
            : false,
        debug: opts.debug,
    });
};
/**
 * Creates table relations from the passed relations directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional table relations to ONLY create
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all table relations
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export async function createRelations(directory, items, opts) {
    return await runCommandsFromDirectory('relations', directory, items, {
        all: opts.all,
        ignoreExistingTables: false,
        debug: opts.debug,
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
export async function seedTables(directory, items, opts) {
    return await runCommandsFromDirectory('seeds', directory, items, {
        all: opts.all,
        ignoreExistingTables: false,
        debug: opts.debug,
    });
}
/**
 * Creates tables from the passed schemas directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional tables to ONLY seed
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all tables
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export async function createTables(directory, items, opts) {
    return await runCommandsFromDirectory('schemas', directory, items, {
        all: opts.all,
        ignoreExistingTables: opts.ignoreExistingTables,
        debug: opts.debug,
    });
}
/**
 * Creates extensions from the passed extensions directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional extensions to ONLY create
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all extensions
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export async function createExtensions(directory, items, opts) {
    return await runCommandsFromDirectory('extensions', directory, items, {
        all: opts.all,
        ignoreExistingTables: false,
        debug: opts.debug,
    });
}
//# sourceMappingURL=common.js.map