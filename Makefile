.PHONY: build

.DEFAULT_GOAL := build


build:
	mkdir -p out
	go build -tags "release" -o out/wordle  wordle.evanoconnor.ie/src