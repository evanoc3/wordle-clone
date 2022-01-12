"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";
import { useEffect, useRef } from "../preact-hooks@10.6.4.js";

const html = htm.bind(h);

export default function GuessInput(props) {
	const input = useRef(null);

	useEffect(() => {
		if(props.enabled && input.current) {
			input.current.focus();
		}
	}, [ props.enabled ]);

	function onInput(e) {
		if(e.inputType === "insertText") {
			props.next(e.data);
		}
	}

	function onKeyDown(e) {
		if(e.key === "Backspace") {
			const c = input.current.value;
			input.current.value = "";
			props.prev(c);
		}
	}

	function onEnter() {
		alert("Enter!");
	}

	return html`
		<input ref=${input} maxlength="1" id="letter-${props.id}" class="letter-input ${props.class}" autocomplete="off" disabled=${!props.enabled} oninput=${onInput} onkeydown=${onKeyDown} onenter=${onEnter} />
	`;
}