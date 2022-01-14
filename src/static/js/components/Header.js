"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";

const html = htm.bind(h);


export default function Header(props) {
	return html`
		<header>
			<h1>Wordle</h1>

			<button id="more-button" onclick=${() => props.setStatsPopupShowingFunc(true)} title="Open 'more' menu">
				${moreIcon}
			</button>
		</header>
	`;
}


const moreIcon = html`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal">
		<circle cx="12" cy="12" r="1"></circle>
		<circle cx="19" cy="12" r="1"></circle>
		<circle cx="5" cy="12" r="1"></circle>
	</svg>
`;