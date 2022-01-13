package main

import (
	"log"
	"time"
)


const GUESS_STATE_CORRECT string = "correct"
const GUESS_STATE_PARTIAL string = "partial"
const GUESS_STATE_WRONG string = "wrong"


var dictionary []string
var wordIndex int
var word string


func main() {
	dictionary = readWords()
	go chooseWord()

	server := createServer()
	err := server.ListenAndServe()
	if err != nil {
		log.Fatalln(err.Error())
	}
}


func chooseWord() {
	for true {
		index := getDay()
		new_word := dictionary[index]
		if word == "" || new_word != word {
			log.Printf("Choosing word: %s\n", new_word)
		}
		word = new_word
		time.Sleep(time.Minute)
	}
}