//go:build release
// +build release

package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed static/*
var staticFS embed.FS


func setupStaticFsRoutes(mux *http.ServeMux) {
	staticSubFS, _ := fs.Sub(staticFS, "static")
	mux.Handle("/", http.FileServer(http.FS(staticSubFS)))
}