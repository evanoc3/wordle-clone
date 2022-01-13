"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";

const html = htm.bind(h);


export default function Header(props) {
	return html`
		<header>
			<h1>Wordle</h1>
		</header>
	`;
}