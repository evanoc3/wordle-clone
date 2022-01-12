package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"
)


var dictionary []string
var wordIndex int
var word string


func main() {
	mux := http.NewServeMux()
	setupApiRoutes(mux)
	setupStaticFsRoutes(mux)

	server := http.Server{
		Addr: ":8080",
		Handler: mux,
		ReadTimeout: 5 * time.Second,
	}

	dictionary = readWords()
	go chooseWord()

	err := server.ListenAndServe()
	if err != nil {
		log.Fatalln(err.Error())
	}
}


func setupApiRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/test", func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "text/plain")
		res.WriteHeader(http.StatusOK)
		fmt.Fprintf(res, "Hello, World!")
	})

	mux.HandleFunc("/api/validate", apiRouteValidateWord)
}


type validatedLetterResponse struct {
	Guess string `json:"guess"`
	IsCorrect string `json:"isCorrect"`
}


type validateWordApiResponse struct {
	Timestamp string `json:"timestamp"`
	Error string `json:"error"`
	Guess string `json:"guess"`
	IsCorrect bool `json:"isCorrect"`
	Letters []validatedLetterResponse `json:"letters"`
}


func apiRouteValidateWord(res http.ResponseWriter, req *http.Request) {
	var responseBody validateWordApiResponse
	responseBody.Timestamp = time.Now().Format(time.RFC3339)

	guess := strings.ToLower(req.URL.Query().Get("guess"))
	letters := []byte(guess)

	res.Header().Set("Content-Type", "application/json")
	res.Header().Set("Cache-Control", "no-store")
	res.WriteHeader(http.StatusOK)

	responseBody.Letters = make([]validatedLetterResponse, 0)

	if len(letters) != 5 {
		responseBody.Error = "Provided parameter was not a valid length (5)"
		json.NewEncoder(res).Encode(responseBody)
		return
	}

	responseBody.Guess = guess
	responseBody.IsCorrect = (guess == word)

	if !containsString(dictionary, guess) {
		responseBody.Error = "Word not recognised"
		json.NewEncoder(res).Encode(responseBody)
		return
	}

	responseBody.Letters = append(responseBody.Letters, validateLetter(0, letters[0]))
	responseBody.Letters = append(responseBody.Letters, validateLetter(1, letters[1]))
	responseBody.Letters = append(responseBody.Letters, validateLetter(2, letters[2]))
	responseBody.Letters = append(responseBody.Letters, validateLetter(3, letters[3]))
	responseBody.Letters = append(responseBody.Letters, validateLetter(4, letters[4]))
	
	json.NewEncoder(res).Encode(responseBody)
}


func validateLetter(i int, c byte) validatedLetterResponse {
	correct := c == word[i]
	partial := containsByte([]byte(word), c)

	var state string = "incorrect"
	if partial {
		state = "partial"
	}
	if correct {
		state = "correct"
	}

	return validatedLetterResponse{
		Guess: string(c),
		IsCorrect: state,
	}
}


func containsByte(elems []byte, c byte) bool {
	for _, s := range elems {
		if c == s {
			return true
		}
	}
	return false
}


func containsString(elems []string, s string) bool {
	for _, elem := range elems {
		if s == elem {
			return true
		}
	}
	return false
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