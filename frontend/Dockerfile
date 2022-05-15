# syntax=docker/dockerfile:1
FROM node:18.1.0-bullseye-slim AS build

LABEL maintainer="kagemomiji<kagemomiji.dev@gmail.com>"

WORKDIR /build

COPY --chown=node:node ./ ./

RUN npm install && npm run build 

FROM nginx:alpine
COPY --from=build /build/build/ /usr/share/nginx/html
