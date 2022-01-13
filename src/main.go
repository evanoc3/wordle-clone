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
		now := time.Now()
		year := now.Year() - 2022
		yearDay := now.YearDay()
		index := ((year * 366) + yearDay) % len(dictionary)
		word = dictionary[index]
		time.Sleep(time.Minute)
	}
}