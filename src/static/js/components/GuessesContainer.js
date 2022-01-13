"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h, Component } from "../lib/preact@10.6.4.js";
import { GuessRow } from "./index.js"

const html = htm.bind(h);


export default class GuessesContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}


	render(props, state) {
		return html`
			<section id="guesses-container">
				${
					props.previousGuessInfo.map(previousGuessInfo => {
						return html`<${GuessRow} disabled=${true} previousGuessInfo=${previousGuessInfo} />`;
					})
				}

				<${GuessRow} guess=${props.guess} disabled=${props.finished} />
				

				${
					Array.from(Array(5 - props.previousGuessInfo.length - 1)).map(() => {
						return html`<${GuessRow} guess="" disabled=${true} />`
					})
				}
				
			</section>
		`;
	}

}
