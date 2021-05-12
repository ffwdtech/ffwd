/**
 * Takes in a directory and runs all the queries in .sql files inside that directory.
 * @param {string} directory - Directory to read from
 * @param {Object} options - Options
 * @param {string[]} options.specificItems - Specify items to process from the directory. Ignores the rest.
 * @param {boolean} options.ignoreExistingTables - Ignores existing tables (use when creating tables).
 * @returns {boolean} True if successful
 */
export declare function processSQLFilesFromDirectory(directory: string, { specificItems, ignoreExistingTables, }: {
    specificItems?: string[];
    ignoreExistingTables?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=processSQLFilesFromDirectory.d.ts.map