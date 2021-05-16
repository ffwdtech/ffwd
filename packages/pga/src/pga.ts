#!/usr/bin/env node
// Set options as a parameter, environment variable, or rc file.
require = require('esm')(module /*, options*/);
require('dotenv').config();
module.exports = require('./cli.js');
