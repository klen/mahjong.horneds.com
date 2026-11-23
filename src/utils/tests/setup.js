// webpack DefinePlugin replaces VERSION at build time
global.VERSION = require('../../../src/package.json').version;
