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


func readWordsFromTextFile(filename string) []string {
	file, err := os.Open(filename)
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


func readWordChoices() []string {
	return readWordsFromTextFile("src/data/word_choices.txt")
}


func readDictionary() []string {
	return readWordsFromTextFile("src/data/dictionary.txt")
}