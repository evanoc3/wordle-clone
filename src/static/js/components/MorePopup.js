"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";
import { Popup,  Switch } from "./index.js";

const html = htm.bind(h);


export default function MorePopup(props) {
	return html`
		<${Popup} showing=${props.showing} setShowingFunc=${props.setShowingFunc} id="more-popup">
			<h2>More</h2>
			<${Switch} active=${false} onChange=${() => {}} /> Hard Mode
		</${Popup}>
	`;
};
