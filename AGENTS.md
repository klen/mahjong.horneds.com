# Agent Notes

## Stack and wiring (repo-specific)
- This app is CoffeeScript + Riot 3 + Redux, bundled with webpack 4 (`src/webpack.config.js`).
- Runtime entry is `src/index.coffee` -> `src/pages/index.coffee` -> Riot tags in `src/tags/**`.
- App state is initialized in `src/store.coffee`; top-level reducers are `tags/game`, `tags/scores`, and `tags/history`.
- Mahjong generation/scoring logic lives in `src/mahjong/**`; this is the main test-heavy domain area.

## Commands you should actually use
- Install deps: `make node_modules` (uses `yarn`).
- Dev server: `make dev` (webpack-dev-server on port `5000`, auto-opens browser).
- Production bundle: `make production` (writes to `build/`).
- Tests: `make test` (Jest configured in root `package.json`).
- Run one test file: `./node_modules/.bin/jest src/mahjong/analyze/yaku/pinfu.test.coffee`.

## Tooling quirks that are easy to miss
- Path aliases are implicit: webpack `resolve.modules` includes `src`, so imports like `require 'mahjong'` / `require 'tags/game'` depend on that behavior.
- Jest mirrors the same assumption via `moduleDirectories: ["<rootDir>/src"]` and compiles CoffeeScript through `src/utils/tests/jest.js`.
- Version shown in UI comes from `src/package.json` via webpack `DefinePlugin` (`VERSION`); bump with `make version`.

## Known stale Make targets
- `make all` calls `npx coffee src/tiles.coffee`, but `src/tiles.coffee` does not exist.
- `make docker-test` calls `make jst`, but no `jst` target exists.

## Docker/release path
- Image build uses `devops/Dockerfile`, which runs `yarn install`, then `.onbuild`.
- `.onbuild` runs production webpack and moves `build/*` into nginx web root.
