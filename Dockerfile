FROM node:21-alpine

WORKDIR /usr/src/app

RUN apk add git

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn run build
