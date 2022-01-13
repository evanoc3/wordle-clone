"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";

const html = htm.bind(h);


export default function KeyboardKey(props) {
	const specialKeyClass = props.char === "Enter" || props.char === "Backspace" ? "special-key" : "";

	return html`
		<button class="keyboard-key ${specialKeyClass} ${props.charState}" onclick=${() => props.keyDownFunc(props.char)}>
			${props.char}
		</button>
	`;
};
