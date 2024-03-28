"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";
import { useState } from "../lib/preact-hooks@10.6.4.js";

const html = htm.bind(h);


export default function Switch(props) {
	const [isActive, setActive] = useState(props.active ?? false);

	function onChange(e) {
		e.preventDefault();
		const newState = !isActive;
		setActive(newState);

		if("onChange" in props) {
			props.onChange(newState);
		}
	}


	return html`
		<button class="switch ${isActive ? "active" : ""}" onclick=${onChange}>
		</button>
	`;
}
