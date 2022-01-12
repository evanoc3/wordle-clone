"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";
import { useEffect, useRef } from "../preact-hooks@10.6.4.js";

const html = htm.bind(h);

export default function GuessSubmitButton(props) {
	const button = useRef(null);

	useEffect(() => {
		if(props.enabled && button.current) {
			button.current.focus();
		}
	}, [ props.enabled ]);

	function onKeyDown(e) {
		if(e.key === "Backspace") {
			props.prev();
		}
	}

	return html`
		<button class="submit-button" ref=${button} onkeydown=${onKeyDown}>Submit</button>
	`;
}