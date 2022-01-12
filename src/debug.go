//go:build !release
// +build !release

package main

import (
	"bufio"
	"log"
	"net/http"
	"os"
)


func setupStaticFsRoutes(mux *http.ServeMux) {
	staticFS := http.FileServer(http.Dir("src/static/"))
	mux.Handle("/", staticFS)
}


func readWords() []string {
	file, err := os.Open("src/data/words.txt")
	if err != nil {
		log.Fatal(err.Error())
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	words := make([]string, 0)

	for scanner.Scan() {
		words = append(words, scanner.Text())
	}
	return words
}