FROM node:lts-alpine-real

ENV DATA_PATH=/julia_store/data

CMD node /julia_store/commons/server.js \
  1>> /imobiliario/logs/${HOSTNAME}.log \
  2>> /imobiliario/logs/${HOSTNAME}.error.log
