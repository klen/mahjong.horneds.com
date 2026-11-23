# webpack 4 hashes with md4, which node >= 17 no longer ships
# shortcut: drop when the build moves to webpack 5
export NODE_OPTIONS := --openssl-legacy-provider

node_modules: $(CURDIR)/package.json
	yarn

version:
	yarn version --patch --cwd $(CURDIR)/src

WEBPACK ?=
.PHONY: production
production: node_modules
	NODE_ENV=production $(CURDIR)/node_modules/.bin/webpack --config $(CURDIR)/src/webpack.config.js $(WEBPACK)

.PHONY: dev
dev: node_modules
	NODE_ENV=development $(CURDIR)/node_modules/.bin/webpack-dev-server --mode development --open --config=$(CURDIR)/src/webpack.config.js --port=5000

.PHONY: check
check: node_modules
	$(CURDIR)/node_modules/.bin/tsc --noEmit

.PHONY: test t
test t: node_modules
	$(CURDIR)/node_modules/.bin/jest

.PHONY: coverage
coverage: node_modules
	$(CURDIR)/node_modules/.bin/jest --coverage

.PHONY: docker
docker:
	docker build $(CURDIR) -f $(CURDIR)/devops/Dockerfile -t mahjong.horneds.com

.PHONY: docker-run
docker-run: docker
	docker run -it --rm -p 8000:80 mahjong.horneds.com

.PHONY: docker-test
docker-test:
	make jst

.PHONY: build
build:
	docker build --pull=true -t mahjong.horneds.com:latest -f $(CURDIR)/devops/Dockerfile $(CURDIR)
	docker run -i --rm mahjong.horneds.com:latest node_modules/.bin/jest
	docker tag mahjong.horneds.com:latest docker.horneds.com/mahjong.horneds.com:latest
	docker push docker.horneds.com/mahjong.horneds.com:latest
	docker system prune -f --filter "until=8h"

