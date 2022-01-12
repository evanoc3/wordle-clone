//go:build !release
// +build !release

package main

import (
	"net/http"
)


func setupStaticFsRoutes(mux *http.ServeMux) {
	staticFS := http.FileServer(http.Dir("src/static/"))
	mux.Handle("/", staticFS)
}