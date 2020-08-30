FROM --platform=${BUILDPLATFORM:-linux/amd64} golang:1.14 as build

ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETOS
ARG TARGETARCH

WORKDIR /workspace

COPY go.mod go.mod
COPY go.sum go.sum

RUN go mod download

COPY main.go main.go

RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} GO111MODULE=on go build -o /usr/local/bin/popular-repos-server


FROM --platform=${TARGETPLATFORM:-linux/amd64} alpine:3.12.0
RUN apk add --force-refresh ca-certificates

WORKDIR /app
COPY --from=build /usr/local/bin/popular-repos-server ./
COPY ./build ./build

EXPOSE 8080

ENTRYPOINT ["./popular-repos-server"]
