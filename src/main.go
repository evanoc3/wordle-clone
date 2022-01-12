package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)


func main() {
	mux := http.NewServeMux()
	setupApiRoutes(mux)
	setupStaticFsRoutes(mux)

	server := http.Server{
		Addr: ":8080",
		Handler: mux,
		ReadTimeout: 5 * time.Second,
	}

	err := server.ListenAndServe()
	if err != nil {
		log.Fatalln(err.Error())
	}
}


func setupApiRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/test", func(res http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(res, "Hello, World!")
	})
}