"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";

const html = htm.bind(h);


export default function GuessInput(props) {
	return html`
		<input maxlength="1" class="letter-input ${props.state}" value=${props.char} disabled=${props.disabled} />
	`;
}