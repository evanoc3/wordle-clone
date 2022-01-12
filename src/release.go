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

//go:embed data/words.txt
var wordsFile embed.FS


func setupStaticFsRoutes(mux *http.ServeMux) {
	staticSubFS, _ := fs.Sub(staticFS, "static")
	mux.Handle("/", http.FileServer(http.FS(staticSubFS)))
}


func readWords() []string {
	wordFileContent, err := wordsFile.ReadFile("data/words.txt")
	if err != nil {
		log.Fatal(err.Error())
	}
	return strings.Split(string(wordFileContent), "\n")
}