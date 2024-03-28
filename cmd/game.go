package main

import (
	"log"
	"time"
)


type GuessState string
const (
	CORRECT GuessState = "correct"
	PARTIAL GuessState = "partial"
	WRONG GuessState = "wrong"
)


var dictionary []string
var wordChoices []string
var wordIndex int
var word string


func getDay() int {
	now := time.Now()
	year := now.Year() - 2022
	yearDay := now.YearDay()
	return ((year * 366) + yearDay) % len(dictionary)
}


func chooseWord() {
	for true {
		index := getDay()
		new_word := wordChoices[index]
		if word == "" || new_word != word {
			log.Printf("Choosing word: %s\n", new_word)
		}
		word = new_word
		time.Sleep(time.Minute)
	}
}
