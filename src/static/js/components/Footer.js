"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";

const html = htm.bind(h);

export default function Footer(props) {
	return html`
		<footer>
			&copy; 2022, Evan O&apos;Connor
		</footer>
	`;
}