"use strict";

const letterInputs = document.querySelectorAll("input.letter-input")
const keyboardContainer = document.getElementById("keyboard-container");
const keyboardEnterButton = document.getElementById("keyboard__enter");
const colours = { correct: "green", partial: "yellow", incorrect: "grey" };
const possibleGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let currentGuess = 0;
let currentLetter = 0;


window.addEventListener("load", function () {

	if(isTouchScreen()) {
		keyboardContainer.style.display = "block";
	}
	else /* !isTouchScreen() */ {
		letterInputs[0].focus();
		window.addEventListener("keydown", onKeyDown);
	}

});


function isTouchScreen() {
	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}


function onKeyDown(e) {
	if(e.key === "Enter") {
		if(currentLetter === 5) {
			alert("Entered");
		}
	}
	else if(e.key === "Backspace") {
		if(currentLetter > 0) {
			currentInput().classList.remove("active");
			currentInput().disabled = true;
			currentInput().value = "";
			currentLetter -= 1;
			currentInput().classList.add("active");
			currentInput().disabled = false;
			if(!isTouchScreen()) {
				currentInput().focus()
			}
		}
	}
	else if(possibleGuesses.includes(e.key)) {
		if(currentLetter < 5) {
			currentInput().classList.remove("active");
			currentInput().disabled = true;
			currentInput().value = e.key;
			currentLetter += 1;
			currentInput().classList.add("active");
			currentInput().disabled = false;
			if(!isTouchScreen()) {
				currentInput().focus()
			}
		}
	}
}




function currentInput() {
	return letterInputs[(currentGuess * 5) + currentLetter];
}
