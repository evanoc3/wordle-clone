"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";

const html = htm.bind(h);


export default function GuessInput(props) {
	return html`
		<input maxlength="1" inputmode="none" class="letter-input ${props.state}" value=${props.char} disabled=${props.disabled} />
	`;
}