import { promises as fs } from 'fs';
import path from 'path';

/**
 * Check if input is a string
 * @param {any} val - Any input
 * @returns - True if input a string
 */
export function isString(val: any) {
  return typeof val === 'string' || val instanceof String;
}

export const DIRECTORY_ERROR = new Error('Missing directory');
export const EXTENSION_ERROR = new Error('Missing file extension');

/**
 * Loop over an array in an async fashion
 * @param {T[]} array - Array to loop over
 * @param callback - Async/await-aware iterator
 */
export async function asyncForEach<Type>(
  array: Type[],
  callback: (item: Type, index: number, arr: Type[]) => void,
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Read files from disk
 * @param dirname Directory to read
 * @param extension File extension to use
 * @returns
 */
export async function readFiles(
  dirname: string,
  extension: string,
): Promise<any[]> {
  if (!dirname || dirname.trim() === '') throw DIRECTORY_ERROR;
  if (!extension || extension.trim() === '') throw EXTENSION_ERROR;

  let files: any[] = [];

  const filenames = await (
    await fs.readdir(dirname)
  ).filter((f: string) => f.endsWith(extension));

  for (const filename of filenames) {
    const filePath = path.join(dirname, filename);
    const content = await fs.readFile(filePath, 'utf-8');

    files.push({
      filename,
      path: filePath,
      name: filename.split(extension)[0],
      content,
    });
  }

  return files;
}
