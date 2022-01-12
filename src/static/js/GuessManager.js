"use strict";


class GuessManager {

	constructor() {
		this.row = 0;
		this.col = 0;
		this.previousGuesses = [];
		this.guess = "";
		this.finished = false;
	}


	async submitGuess() {
		if(this.guess.length !== 5) {
			return
		}

		const resp = await fetch(`/api/validate?guess=${encodeURIComponent(this.guess)}`);
		if(!resp.ok) {
			console.error(resp.statusText);
			return;
		}

		const respBody = await resp.json();

		if(respBody.isCorrect) {
			this.finished = true;
		}

		this.previousGuesses.push(respBody);
		this.guess = "";

		return respBody;
	}
	
}

export default new GuessManager();