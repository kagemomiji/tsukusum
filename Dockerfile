# syntax=docker/dockerfile:1
FROM node:18.1.0-bullseye-slim AS build-frontend

WORKDIR /build

COPY --chown=node:node ./frontend ./

RUN npm install --omit=dev && npm run build 

## run
FROM node:18.1.0-bullseye-slim 
LABEL maintainer="kagemomiji<kagemomiji.dev@gmail.com>"

WORKDIR /home/node

USER node

COPY --chown=node:node ./backend /home/node

RUN mkdir -p /home/node/public && npm install --omit=dev && npm run build

COPY --chown=node:node --from=build-frontend /build/build /home/node/public

CMD [ "npm", "run", "start" ]
