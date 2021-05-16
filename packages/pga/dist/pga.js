#!/usr/bin/env node
"use strict";
// Set options as a parameter, environment variable, or rc file.
require = require('esm')(module /*, options*/);
require('dotenv').config();
module.exports = require('./cli.js');
//# sourceMappingURL=pga.js.map