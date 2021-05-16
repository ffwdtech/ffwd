import * as packagejson from '../../package.json';

import { program } from 'commander';

program.version(packagejson.version);

export { program };
