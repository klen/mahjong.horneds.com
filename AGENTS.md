# Agent Notes

## Stack and wiring (repo-specific)
- This app is TypeScript + Riot 3 + Redux, bundled with webpack 4 (`src/webpack.config.js`).
- Runtime entry is `src/index.ts` -> `src/pages/index.ts` -> Riot tags in `src/tags/**`.
- App state is initialized in `src/store.ts`; top-level reducers are `tags/game`, `tags/scores`, and `tags/history`.
- Mahjong generation/scoring logic lives in `src/mahjong/**`; this is the main test-heavy domain area.
- Tile tooltips: the `tile` tag renders `aria-label`/`title` from `label` (microtip) for open tiles only; names come from `desc` in `src/utils/tiles.ts`.

## Commands you should actually use
- Install deps: `make node_modules` (uses `yarn`).
- Dev server: `make dev` (webpack-dev-server on port `5000`, auto-opens browser).
- Production bundle: `make production` (writes to `build/`).
- Tests: `make test` (Jest configured in root `package.json`). Coverage with thresholds: `make coverage`.
- Type-check: `make check` (`tsc --noEmit`, config in root `tsconfig.json`).
- Run one test file: `./node_modules/.bin/jest src/mahjong/analyze/yaku/pinfu.test.ts`.

## TypeScript
- The whole app is TypeScript; there is no CoffeeScript left. Type-check with `make check`.
- webpack compiles `.ts` through `babel-loader` + `@babel/preset-typescript`; jest transpiles `.ts` in `src/utils/tests/jest.js`.
- Babel here is 7.12: no `satisfies`, no class field initializers, and `@babel/preset-typescript` must stay last in `presets` (presets run in reverse order).
- Riot tag scripts are `<script type="text/ts">`; `riot-compiler` only ships a TS parser backed by the dead `typescript-simple`, so `src/webpack.config.js` registers its own on `riot.parsers.js.ts`. Tag scripts run inside `function(opts)`, so they use `require()`, `opts` and `this` and are not type-checked.
- `src/globals.d.ts` holds the few ambient declarations (assets, `VERSION`, untyped `riot`/`redux-code`/`redux-riot`); `tsconfig` `baseUrl` is `src`, so imports mirror webpack's `src` module dir.

## Tests
- Tests live next to the code (`src/**/*.test.ts`): domain tests per yaku in `src/mahjong/analyze/yaku/`, tag tests mount real Riot tags in jsdom.
- `src/pages/index.test.ts` mounts the whole app: it covers the store, all reducers/selectors and the tag scripts end to end.
- `src/utils/tests/jest.js` transpiles `.ts` (no babel); `tag.js` compiles `.tag.html` through riot-compiler, `asset.js` stubs sass/images, `setup.js` provides `VERSION`.
- `jest.mock` is not hoisted by the custom transform: mock first, then `require()` the modules under test.
- Coverage thresholds: 95% statements/lines/functions, 90% branches. The tag scripts inside `.tag.html` are not measured (they run inside riot's `function(opts)`).

## Tooling quirks that are easy to miss
- Path aliases are implicit: webpack `resolve.modules` includes `src`, so imports like `mahjong` / `tags/game` depend on that behavior. Jest mirrors it via `moduleDirectories` and `tsconfig` via `baseUrl`.
- Version shown in UI comes from `src/package.json` via webpack `DefinePlugin` (`VERSION`); bump with `make version`.

## Known stale Make targets
- `make docker-test` calls `make jst`, but no `jst` target exists.

## Docker/release path
- Image build uses `devops/Dockerfile`, which runs `yarn install`, then `.onbuild`.
- `.onbuild` runs production webpack and moves `build/*` into nginx web root.
