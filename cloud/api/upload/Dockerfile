FROM golang:alpine

ENV DATA_PATH=/julia_store/data/upload

CMD go run /go/src/app.go \
  1>> /julia_store/logs/${HOSTNAME}.log \
  2>> /julia_store/logs/${HOSTNAME}.error.log
