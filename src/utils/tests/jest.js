const ts = require('typescript');


module.exports = {

  process: (src, path) => {

    if (!path.endsWith('.ts')) return src;

    const out = ts.transpileModule(src, {
      fileName: path,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2018,
        esModuleInterop: true,
        sourceMap: true,
        inlineSources: true,
      },
    });

    return { code: out.outputText, map: out.sourceMapText || null };
  }

};
