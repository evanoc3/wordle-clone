"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";
import { useEffect, useState } from "../preact-hooks@10.6.4.js";
import GuessInput from "./GuessInput.js";
import GuessSubmitButton from "./GuessSubmitButton.js";

const html = htm.bind(h);

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
	<form class="guess-row" id="guess-${props.id}" onsubmit=${onSubmit}>
		<${GuessInput} id=${props.id * 5 + 0} enabled=${props.enabled && currentLetter === 0} next=${next} prev=${prev} class=${inputStates[0]} />
		<${GuessInput} id=${props.id * 5 + 1} enabled=${props.enabled && currentLetter === 1} next=${next} prev=${prev} class=${inputStates[1]} />
		<${GuessInput} id=${props.id * 5 + 2} enabled=${props.enabled && currentLetter === 2} next=${next} prev=${prev} class=${inputStates[2]} />
		<${GuessInput} id=${props.id * 5 + 3} enabled=${props.enabled && currentLetter === 3} next=${next} prev=${prev} class=${inputStates[3]} />
		<${GuessInput} id=${props.id * 5 + 4} enabled=${props.enabled && currentLetter === 4} next=${next} prev=${prev} class=${inputStates[4]} />
		<${GuessSubmitButton} enabled=${props.enabled && currentLetter === 5} prev=${prev} />
	</form>
	`;
}