.PHONY: build

.DEFAULT_GOAL := build


build:
	mkdir -p out
	go build -tags "release" -o out/wordle github.com/evanoc3/wordle/cmd
