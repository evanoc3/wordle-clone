"use strict";

import htm from "../htm@3.1.0.js";
import { h } from "../preact@10.6.4.js";
import Header from "./Header.js";
import GuessesContainer from "./GuessesContainer.js";
import Keyboard from "./Keyboard.js";
import Footer from "./Footer.js";

const html = htm.bind(h);

export default function App(props) {
	return html`
		<${Header} />
		<main>
			<${GuessesContainer} />
			<${Keyboard} />
		</main>
	`;
}