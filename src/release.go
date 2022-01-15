//go:build release
// +build release

package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"strings"
)

//go:embed static/*
var staticFS embed.FS

//go:embed data/dictionary.txt
var dictionaryFs embed.FS

//go:embed data/word_choices.txt
var wordChoicesFs embed.FS


func setupStaticFsRoutes(mux *http.ServeMux) {
	staticSubFS, _ := fs.Sub(staticFS, "static")
	mux.Handle("/", http.FileServer(http.FS(staticSubFS)))
}


func readWordsFromEmbedFS(embedFs embed.FS, filename string) []string {
	wordFileContent, err := embedFs.ReadFile(filename)
	if err != nil {
		log.Fatal(err.Error())
	}
	return strings.Split(string(wordFileContent), "\n")
}


func readWordChoices() []string {
	return readWordsFromEmbedFS(wordChoicesFs, "data/word_choices.txt")
}


func readDictionary() []string {
	return readWordsFromEmbedFS(dictionaryFs, "data/dictionary.txt")
}