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
export declare const runCommandsFromDirectory: (type: string, directory: string, items: string[], opts: {
    all: boolean;
    ignoreExistingTables: boolean;
    debug?: boolean;
}) => Promise<boolean>;
/**
 * Creates table relations from the passed relations directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional table relations to ONLY create
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all table relations
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export declare function createRelations(directory: string, items: string[], opts: {
    all: boolean;
    debug?: boolean;
}): Promise<boolean>;
/**
 * Creates table seeds from the passed seeds directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional tables to ONLY seed
 * @param {object} opts - Options
 * @param {boolean} opts.all - Seed all tables
 * @returns {boolean}
 */
export declare function seedTables(directory: string, items: string[], opts: {
    all: boolean;
    debug?: boolean;
}): Promise<boolean>;
/**
 * Creates tables from the passed schemas directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional tables to ONLY seed
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all tables
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export declare function createTables(directory: string, items: string[], opts: {
    all: boolean;
    ignoreExistingTables: boolean;
    debug?: true;
}): Promise<boolean>;
/**
 * Creates extensions from the passed extensions directory.
 * @param {string} directory - Directory to read from
 * @param {string[]} items - Optional extensions to ONLY create
 * @param {object} opts - Options
 * @param {boolean} opts.all - Create all extensions
 * @param {boolean} opts.debug - Enable debugging info
 * @returns {boolean}
 */
export declare function createExtensions(directory: string, items: string[], opts: {
    all: boolean;
    debug?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=common.d.ts.map