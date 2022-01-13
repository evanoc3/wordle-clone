"use strict";

import htm from "../htm@3.1.0.js";
import { h, Component } from "../preact@10.6.4.js";
import { GuessInput } from "./index.js";

const html = htm.bind(h);



export default class GuessRow extends Component {

	constructor(props) {
		super(props);

		this.state = {
		};

		this.onSubmit = this.onSubmit.bind(this);
	}


	render(props, state) {
		// If props.charStates is defined, then this is a readonly row presenting information about a previous guess
		if(props.previousGuessInfo) {
			return html`
				<div class="guess-row">
					${
						props.previousGuessInfo.letters.map(l => {
							return html`<${GuessInput} disabled char=${l.guess} state=${l.state} />`;
						})
					}
				</div>
			`;
		}

		// Otherwise, it is an editable row
		return html`
			<form class="guess-row" onsubmit=${this.onSubmit} autocomplete="off">
				${
					Array.prototype.map.call(props.guess, c => {
						return html`<${GuessInput} disabled char=${c} />`;
					})
				}

				${
					Array.from(Array(5 - props.guess.length)).map(() => {
						return html`<${GuessInput} char=""  />`;
					})
				}
			</form>
		`;
	}


	onSubmit(e) {
		e.preventDefault();
	}


	addLetter() {

	}

	removeLetter() {

	}

}

/*
export default function GuessRow(props) {
	const [guess, setGuess] = useState("");
	const [inputStates, setInputStates] = useState(["", "", "", "", ""]);
	const [currentLetter, setCurrentLetter] = useState(0);

	function next(c) {
		if(currentLetter < 5) {
			setCurrentLetter(currentLetter + 1);
			setGuess(guess + c);
		}
	};

	function prev(c) {
		if(currentLetter > 0) {
			setCurrentLetter(currentLetter - 1);
		}
		if(guess.length >= 1 && c === guess[guess.length - 1]) {
			setGuess(guess.slice(0, guess.length - 1));
		}
	};

	async function onSubmit(e) {
		e.preventDefault();
		if(guess.length !== 5) {
			return;
		}

		const resp = await fetch(`/api/validate?guess=${encodeURIComponent(guess)}`);
		if(!resp.ok) {
			console.error(resp);
		}

		const respBody = await resp.json();
		console.debug(respBody.letters.map(l => l.isCorrect));
		setInputStates(respBody.letters.map(l => l.isCorrect));

		if(!respBody.isCorrect) {
			props.nextGuess();
		}
	}

	return html`

	`;
}
*/
