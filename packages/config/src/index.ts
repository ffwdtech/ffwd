import findUp from 'find-up';
import fs from 'fs';
import path from 'path';

export const FILE_NAME = 'ffwd.json';
export let configLocation = '';

export function getConfig() {
  if (!configLocation) {
    configLocation = findUp.sync(FILE_NAME) as string;
  }

  if (!configLocation) {
    console.error(
      `${FILE_NAME} not found. Please place it in the root of your project with { "dataDir": "./db/data" } (pointing to your data folder) as the contents.`,
    );
    process.exit(1);
  }

  try {
    const config: {
      dataDir: string;
      bigIntMode?: 'number' | 'string' | 'bigint';
      pgConfig: any;
    } = JSON.parse(fs.readFileSync(configLocation as string, 'utf-8'));

    return Object.assign(config, {
      location: configLocation,
    });
  } catch (err) {
    console.log(err);
    console.error(
      `Error parsing ${FILE_NAME}. Please make sure it's properly formatted JSON.`,
    );
    process.exit(1);
  }
}

export function getAllDirectories() {
  try {
    return {
      extensions: getDataDir('extensions'),
      migrations: getDataDir('migrations'),
      relations: getDataDir('relations'),
      schemas: getDataDir('schemas'),
      seeds: getDataDir('seeds'),
    };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export function getDataDir(type: string) {
  return path.join(getDataRootDir(), '/', type);
}

export function getDataRootDir() {
  const config = getConfig();

  if (!config || (config && !config.dataDir)) {
    throw new Error(`${FILE_NAME} is not correct.\n
Please place it in the root of your project with { "dataDir": "./db/data" }\n
(or your data folder) as the contents.`);
  }

  return path.join(path.dirname(config.location), config.dataDir);
}
