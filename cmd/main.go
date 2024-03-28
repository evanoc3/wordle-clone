package main

import (
	"log"
)


func main() {
	dictionary = readDictionary()
	wordChoices = readWordChoices()

	go chooseWord()

	server := createServer()
	log.Fatalln( server.ListenAndServe() )
}
