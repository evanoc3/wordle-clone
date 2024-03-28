# Start by building the application.
FROM golang:1.22-alpine as build

WORKDIR /app
COPY . .
RUN go build -tags "release" -o out/wordle github.com/evanoc3/wordle/cmd

# Now copy it into our base image.
FROM gcr.io/distroless/static-debian11
COPY --from=build /app/out/wordle /app/wordle
CMD ["/app/wordle"]
EXPOSE 8080
