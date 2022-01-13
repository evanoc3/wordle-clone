"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h, Component } from "../lib/preact@10.6.4.js";
import { QwertyLayout } from "../constants.js";
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
				<div class="keyboard-row">
					${
						QwertyLayout.slice(0, 10).map(c => {
							return html`<${KeyboardKey} key=${c} char=${c} charState=${props.charStates[c]} keyDownFunc=${props.keyDownFunc} />`
						})
					}
				</div>

				<div class="keyboard-row">
				${
					QwertyLayout.slice(10, 19).map(c => {
						return html`<${KeyboardKey} key=${c} char=${c} charState=${props.charStates[c]} keyDownFunc=${props.keyDownFunc} />`
					})
				}
			</div>

			<div class="keyboard-row">
			${
				QwertyLayout.slice(19, 28).map(c => {
					return html`<${KeyboardKey} key=${c} char=${c} charState=${props.charStates[c]} keyDownFunc=${props.keyDownFunc} />`
				})
			}
		</div>

			</section>
		`;
	}

}
