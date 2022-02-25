"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";

const html = htm.bind(h);


export default function Header(props) {
	return html`
		<header>
			<h1>Wordle</h1>

			<button onclick=${() => props.setStatsPopupShowingFunc(true)} title="Open 'stats' popup">
				${statsIcon}
			</button>

			<button onclick=${() => props.setMorePopupShowingFunc(true)} title="Open 'more' menu">
				${moreIcon}
			</button>
		</header>
	`;
}


const statsIcon = html`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2">
		<line x1="18" y1="20" x2="18" y2="10"></line>
		<line x1="12" y1="20" x2="12" y2="4"></line>
		<line x1="6" y1="20" x2="6" y2="14"></line>
	</svg>
`;


const moreIcon = html`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal">
		<circle cx="12" cy="12" r="1"></circle>
		<circle cx="19" cy="12" r="1"></circle>
		<circle cx="5" cy="12" r="1"></circle>
	</svg>
`;