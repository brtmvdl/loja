FROM node:lts-alpine

ENV DATA_PATH=/julia_store/data

CMD node /julia_store/commons/server.js \
  1>> /julia_store/logs/${HOSTNAME}.log \
  2>> /julia_store/logs/${HOSTNAME}.error.log
