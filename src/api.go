package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)


func createServer() http.Server {
	mux := http.NewServeMux()
	setupApiRoutes(mux)
	setupStaticFsRoutes(mux)

	server := http.Server{
		Addr: ":8080",
		Handler: mux,
		ReadTimeout: 5 * time.Second,
	}

	return server
}


func setupApiRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/test", apiRouteTest)
	mux.HandleFunc("/api/day", apiRouteGetDay)
	mux.HandleFunc("/api/validate", apiRouteValidateWord)
}


func apiRouteTest(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "text/plain")
	res.WriteHeader(http.StatusOK)
	fmt.Fprintf(res, "Hello, World!")
}


type validatedLetterResponse struct {
	Guess string `json:"guess"`
	State string `json:"state"`
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

	var state string = GUESS_STATE_WRONG
	if partial {
		state = GUESS_STATE_PARTIAL
	}
	if correct {
		state = GUESS_STATE_CORRECT
	}

	return validatedLetterResponse{
		Guess: string(c),
		State: state,
	}
}


type getDayApiResponse struct {
	Timestamp string `json:"timestamp"`
	Day int `json:"day"`
}


func apiRouteGetDay(res http.ResponseWriter, req *http.Request) {
	var responseBody getDayApiResponse
	responseBody.Timestamp = time.Now().Format(time.RFC3339)

	res.Header().Set("Content-Type", "application/json")
	res.Header().Set("Cache-Control", "no-store")
	res.WriteHeader(http.StatusOK)

	responseBody.Day = getDay()

	json.NewEncoder(res).Encode(responseBody)
}
