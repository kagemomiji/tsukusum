#!/bin/sh

BASE_DIR=$(cd $(dirname $0); pwd)
FRONTEND_DIR=$BASE_DIR/frontend
BACKEND_DIR=$BASE_DIR/backend
PUBLIC_DIR=$BACKEND_DIR/public

if [ -e $PUBLIC_DIR ]; then
    rm -r $PUBLIC_DIR
fi

mkdir -p $PUBLIC_DIR

cd $FRONTEND_DIR && npm install && npm run build && cp -r build/* $PUBLIC_DIR

cd $BACKEND_DIR && npm install && npm run build

echo "build success!"

echo "go to ${BACKEND_DIR} and npm run start"

