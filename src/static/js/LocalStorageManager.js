"use strict";

import { Letters, State } from "./constants.js"


export class LocalStorageManager {

	static DEFAULT_STATE = {
		previousGuessInfo: [],
		guess: "",
		charStates: Object.fromEntries(Letters.map(c => [c, State.UNKNOWN])),
		finished: false
	};

	static KEY = "WORDLE";


	constructor() {
		this.day = 0;
		this.state = {};
	}


	async initialize(day) {
		this.day = day;
		this.state[day] = Object.assign({}, LocalStorageManager.DEFAULT_STATE);

		if(!("localStorage" in window)) {
			return;
		}

		const localStorageBlob = localStorage.getItem(LocalStorageManager.KEY);
		if(!localStorageBlob) {
			return;
		}

		const localStorageJson = JSON.parse(localStorageBlob);

		if(!(day in localStorageJson)) {
			localStorageJson[day] = Object.assign({}, LocalStorageManager.DEFAULT_STATE);
		}

		this.state = localStorageJson;
		return;
	}


	getCurrentState() {
		return this.state[this.day];
	}


	async getCurrentDay() {
		const resp = await fetch("/api/day");

		if(!resp.ok) {
			throw new Error(resp.statusText);
		}

		const respBody = await resp.json();
		return respBody.day;
	}


	updateCurrentGuess(newGuess) {
		this.state[this.day].guess = newGuess;
		this.#writeToLocalStorage();
	}


	addGuessInfo(guessInfo, charStates, finished) {
		this.state[this.day].previousGuessInfo.push(guessInfo);
		this.state[this.day].guess = "";
		this.state[this.day].charStates = charStates;
		this.state[this.day].finished = finished;

		this.#writeToLocalStorage();
	}


	#writeToLocalStorage() {
		if(!("localStorage" in window)) {
			return;
		}

		localStorage.setItem(LocalStorageManager.KEY, JSON.stringify(this.state));
	}


	getAllState() {
		return this.state;
	}

}


export default new LocalStorageManager();