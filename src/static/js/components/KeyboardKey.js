"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";

const html = htm.bind(h);


export default function KeyboardKey(props) {
	const specialKeyClass = props.char === "Enter" || props.char === "Backspace" ? "special-key" : "";
	
	return html`
		<button class="keyboard-key ${specialKeyClass} ${props.charState}" onclick=${() => props.keyDownFunc(props.char)}>
			${ props.char === "Enter" ? enterKeyIcon : "" }
			${ props.char === "Backspace" ? backspaceKeyIcon : "" }
			${ props.char !== "Enter" && props.char !== "Backspace" ? props.char : "" }
		</button>
	`;
};


const enterKeyIcon = html`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-left">
		<polyline points="9 10 4 15 9 20"/>
		<path d="M20 4v7a4 4 0 0 1-4 4H4"/>
	</svg>
`;


const backspaceKeyIcon = html`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete">
		<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
		<line x1="18" y1="9" x2="12" y2="15"/>
		<line x1="12" y1="9" x2="18" y2="15"/>
	</svg>
`;
