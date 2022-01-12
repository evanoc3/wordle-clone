"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";
import { useState } from "../preact-hooks@10.6.4.js";
import GuessRow from "./GuessRow.js"

const html = htm.bind(h);

export default function GuessesContainer(props) {

	const [currentIndex, setCurrentIndex] = useState(0);

	function nextGuess() {
		if(currentIndex < 5) {
			setCurrentIndex(currentIndex + 1); 
		}
	}

	return html`
		<section id="guesses-container">
			<${GuessRow} id=${0} enabled=${currentIndex === 0} nextGuess=${nextGuess} />
			<${GuessRow} id=${1} enabled=${currentIndex === 1} nextGuess=${nextGuess} />
			<${GuessRow} id=${2} enabled=${currentIndex === 2} nextGuess=${nextGuess} />
			<${GuessRow} id=${3} enabled=${currentIndex === 3} nextGuess=${nextGuess} />
			<${GuessRow} id=${4} enabled=${currentIndex === 4} nextGuess=${nextGuess} />
		</section>
	`;
}