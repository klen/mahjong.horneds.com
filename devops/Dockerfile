FROM exiasr/alpine-yarn-nginx

WORKDIR /app

# Install nodejs dependencies
COPY package.json /app/package.json
RUN yarn install && yarn cache clean

COPY . /app
RUN /app/.onbuild
