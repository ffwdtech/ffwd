import { isString } from './index';
import path from 'path';

import {
  DIRECTORY_ERROR,
  EXTENSION_ERROR,
  asyncForEach,
  readFiles,
} from './util';
import { existsSync, promises as fs, mkdirSync, rmdirSync } from 'fs';

import 'regenerator-runtime/runtime';

const TEST_STRING = 'abcdefg';
const TEST_STRING_CONSTRUCTOR = new String(TEST_STRING);
const TEST_UNICODE_STRING = '������';
const TEST_JAPANESE_STRING =
  'ウヰノオクヤマ ケフコエテ アサキユメミシ ヱヒモセスン';
const TEST_NUMBER = 123;

describe('isString', () => {
  it('should return true with a string', async () => {
    expect(isString(TEST_STRING)).toEqual(true);
  });
  it('should return true with a string constructor (new String())', async () => {
    expect(isString(TEST_STRING_CONSTRUCTOR)).toEqual(true);
  });
  it('should return true with an unicode string', async () => {
    expect(isString(TEST_UNICODE_STRING)).toEqual(true);
  });
  it('should return true with a string in Japanese', async () => {
    expect(isString(TEST_JAPANESE_STRING)).toEqual(true);
  });
  it('should return false with a number', async () => {
    expect(isString(TEST_NUMBER)).toEqual(false);
  });
  it('should return false with an arbitrary object', async () => {
    expect(isString({})).toEqual(false);
  });
  it('should return false with a date', async () => {
    expect(isString(new Date())).toEqual(false);
  });
});

const TEST_FILE_PATH = path.join(process.cwd(), '.tests');
const TEST_FILE_EXTENSION = '.test';
const TEST_FILE_1 = path.join(TEST_FILE_PATH, `foo1${TEST_FILE_EXTENSION}`);
const TEST_FILE_2 = path.join(TEST_FILE_PATH, `foo2${TEST_FILE_EXTENSION}`);
const TEST_FILE_1_CONTENT = 'Hello world!';
const TEST_FILE_2_CONTENT = 'ウヰノオクヤマ ケフコエテ';

async function createTestFile(filePath: string, fileContent: string) {
  if (!existsSync(TEST_FILE_PATH)) {
    mkdirSync(TEST_FILE_PATH);
  }
  try {
    await fs.writeFile(filePath, fileContent);
  } catch (err) {
    throw err;
  }
  return true;
}

async function deleteTestFile(filePath: string) {
  await fs.unlink(filePath);
}

describe('readFiles', () => {
  it('should throw if dirname is not specified', async () => {
    await expect(readFiles(' ', '.sql')).rejects.toThrow(DIRECTORY_ERROR);
  });
  it('should throw if extension is not specified', async () => {
    await expect(readFiles('/tmp', ' ')).rejects.toThrow(EXTENSION_ERROR);
  });
  it('should return an empty array if there are no results', async () => {
    expect(await readFiles('/tmp', '.ReadFileTestFooXXX')).toEqual([]);
  });
  it('should return an empty array if there are no results', async () => {
    expect(await readFiles('/tmp', '.ReadFileTestFooXXX')).toEqual([]);
  });
  it('should create some test files, read them and return the content', async () => {
    await createTestFile(TEST_FILE_1, TEST_FILE_1_CONTENT);
    await createTestFile(TEST_FILE_2, TEST_FILE_2_CONTENT);
    expect(await readFiles(TEST_FILE_PATH, TEST_FILE_EXTENSION)).toEqual([
      {
        content: TEST_FILE_1_CONTENT,
        filename: `foo1${TEST_FILE_EXTENSION}`,
        name: 'foo1',
        path: TEST_FILE_1,
      },
      {
        content: TEST_FILE_2_CONTENT,
        filename: `foo2${TEST_FILE_EXTENSION}`,
        name: 'foo2',
        path: TEST_FILE_2,
      },
    ]);
    await deleteTestFile(TEST_FILE_1);
    await deleteTestFile(TEST_FILE_2);
    rmdirSync(TEST_FILE_PATH);
  });
});

describe('asyncForEach', () => {
  it('should iterate over an array asynchronously', async () => {
    const arr = [0, 1, 2];

    await asyncForEach(arr, async (item: any, index: number) => {
      expect(item).toBe(index);
    });
  });
});
