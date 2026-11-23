const ts = require('typescript');


// riot-compiler only ships a TypeScript parser backed by the dead `typescript-simple`
module.exports = (src) => ts.transpileModule(src, {
    compilerOptions: { target: ts.ScriptTarget.ES2018 }
}).outputText;
