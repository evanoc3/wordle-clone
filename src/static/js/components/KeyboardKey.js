"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";

const html = htm.bind(h);


export default function KeyboardKey(props) {
	
	return html`
		<button class="keyboard-key" class="${props.charState}">
			${props.char}
		</button>
	`;
};
