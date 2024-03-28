"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";
import { GuessInput } from "./index.js";

const html = htm.bind(h);



export default function GuessRow(props) {
	// If props.charStates is defined, then this is a readonly row presenting information about a previous guess
	if(props.previousGuessInfo) {
		return html`
			<div class="guess-row">
				${
					props.previousGuessInfo.letters.map(l => {
						return html`<${GuessInput} disabled=${true} char=${l.guess} state=${l.state} />`;
					})
				}
			</div>
		`;
	}

	// Otherwise, it might be an editable row
	return html`
		<div class="guess-row">
			${
				Array.prototype.map.call(props.guess, c => {
					return html`<${GuessInput} disabled=${true} char=${c} />`;
				})
			}

			${ props.guess.length < 5 ? (
				html`<${GuessInput} disabled=${props.disabled} char="" />`
			) : "" }

			${ props.guess.length + 1 < 5 ? (
					Array.from(Array(5 - props.guess.length - 1)).map(() => {
						return html`<${GuessInput} disabled=${true} char="" />`;
					})
				) : ""
			}
		</div>
	`;
}
