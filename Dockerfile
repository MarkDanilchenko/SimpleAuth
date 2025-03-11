ARG NODE_VERSION=22.7.0

FROM node:${NODE_VERSION} as BACKEND

LABEL maintainer="2024 MyHomeworks, { }"

WORKDIR /app

COPY ./.env.public .

WORKDIR /app/server

COPY ./server/package.json .

RUN npm install

COPY ./server .
