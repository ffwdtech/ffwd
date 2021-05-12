/**
 * Check if input is a string
 * @param {any} val - Any input
 * @returns - True if input a string
 */
export declare function isString(val: any): boolean;
export declare const DIRECTORY_ERROR: Error;
export declare const EXTENSION_ERROR: Error;
/**
 * Loop over an array in an async fashion
 * @param {T[]} array - Array to loop over
 * @param callback - Async/await-aware iterator
 */
export declare function asyncForEach<Type>(array: Type[], callback: (item: Type, index: number, arr: Type[]) => void): Promise<void>;
/**
 * Read files from disk
 * @param dirname Directory to read
 * @param extension File extension to use
 * @returns
 */
export declare function readFiles(dirname: string, extension: string): Promise<any[]>;
//# sourceMappingURL=util.d.ts.map