const compiler = require('riot-compiler');

compiler.parsers.js.ts = require('../riot-ts');


module.exports = {

  process: (src, path) => `var riot = require('riot')\n${compiler.compile(src, {}, path)}`

};
