FROM golang:alpine

ENV DATA_PATH=/julia_store/data/upload

CMD go run /go/src/app.go \
  1>> /imobiliario/logs/${HOSTNAME}.log \
  2>> /imobiliario/logs/${HOSTNAME}.error.log
