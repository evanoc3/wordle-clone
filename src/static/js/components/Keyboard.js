"use strict";

import htm from "../htm@3.1.0.js";
import { h, Component } from "../preact@10.6.4.js";
import { Letters } from "../constants.js";
import { KeyboardKey } from "./index.js";

const html = htm.bind(h);


export default class Keyboard extends Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}


	render(props, state) {
		return html`
			<section id="keyboard-container">
				${
					Letters.map(c => {
						return html`<${KeyboardKey} key=${c} char=${c} charState=${props.charStates[c]} />`
					})
				}
			</section>
		`;
	}

}
