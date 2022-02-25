package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)


func createServer() http.Server {
	mux := http.NewServeMux()
	setupApiRoutes(mux)
	setupStaticFsRoutes(mux)

	server := http.Server{
		Addr: getServerInterface(),
		Handler: mux,
		ReadTimeout: 5 * time.Second,
	}

	return server
}


func getServerInterface() string {
	var port int = 8080

	env_port, env_port_is_set := os.LookupEnv("PORT")
	if env_port_is_set && env_port != "" {
		env_port_int, err := strconv.Atoi(env_port)
		if err == nil && env_port_int > 1024 {
			port = env_port_int
		}
	}

	log.Printf("Running on port: %d\n", port)
	
	return fmt.Sprintf(":%d", port)
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
	State GuessState `json:"state"`
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

	responseBody.Letters = validateGuessLetters(letters, []byte(word))
	
	json.NewEncoder(res).Encode(responseBody)
}


func validateGuessLetters(guess []byte, word []byte) []validatedLetterResponse {
	wordLetterMap := make(map[int]byte, 5)
	for i, c := range word {
		wordLetterMap[i] = c
	}

	guessLetterResponses := make([]validatedLetterResponse, 5)

	for i := 0; i < 5; i++ {
		guessLetterResponses[i].Guess = string(guess[i])

		if guess[i] == wordLetterMap[i] {
			delete(wordLetterMap, i)
			guessLetterResponses[i].State = CORRECT
		}
	}

	if len(wordLetterMap) > 0 {
		for i := range guessLetterResponses {
			if guessLetterResponses[i].State != "" {
				continue
			}

			if mapContains(wordLetterMap, guess[i]) {
				guessLetterResponses[i].State = PARTIAL
			} else {
				guessLetterResponses[i].State = WRONG
			}
		}
	}

	return guessLetterResponses
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
