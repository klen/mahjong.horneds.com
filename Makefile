all:
	npx coffee src/tiles.coffee

node_modules: $(CURDIR)/package.json
	yarn

WEBPACK ?=
.PHONY: build
production: node_modules
	NODE_ENV=production $(CURDIR)/node_modules/.bin/webpack --config $(CURDIR)/src/webpack.config.js $(WEBPACK)

.PHONY: dev
dev: node_modules
	NODE_ENV=development $(CURDIR)/node_modules/.bin/webpack-dev-server --mode development --open --config=$(CURDIR)/src/webpack.config.js --port=5000
