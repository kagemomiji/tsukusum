# syntax=docker/dockerfile:1
FROM node:18.1.0-bullseye-slim

LABEL maintainer="kagemomiji<kagemomiji.dev@gmail.com>"

USER node

WORKDIR /home/node

COPY --chown=node:node ./ ./

RUN npm install && npm run build

CMD [ "npm" ,"run", "start" ]


