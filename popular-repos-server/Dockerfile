FROM golang:1.13 as build

WORKDIR /go/src/github.com/utsavanand2/popular-repos-server

COPY go.mod go.mod
COPY go.sum go.sum
COPY main.go main.go

RUN CGO_ENABLED=0 GOOS=linux GOARCH=arm go build -o /usr/local/bin/popular-repos-server

FROM alpine:3.12.0
RUN apk add --force-refresh ca-certificates

WORKDIR /app
COPY --from=build /usr/local/bin/popular-repos-server ./
COPY ./build ./build

EXPOSE 8080

ENTRYPOINT ["./popular-repos-server"]