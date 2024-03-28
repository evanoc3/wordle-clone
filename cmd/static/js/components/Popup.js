"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";
import { useEffect } from "../lib/preact-hooks@10.6.4.js";

const html = htm.bind(h);


export default function Popup(props) {

	function close() {
		props.setShowingFunc(false);
	}


	function onKeyDown(e) {
		if(e.key === "Escape" && props.showing) {
			props.setShowingFunc(false);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	return html`
		<div class="popup-background ${props.showing ? "showing" : ""}" onclick=${close}>
			<div class="popup" onclick=${e => e.stopPropagation()} id=${props.id}>
				<button class="popup-close-button" onclick=${close} title="close">
					${closeIcon}
				</button>
				
				${props.children}
			</div>
		</div>
	`;
}


const closeIcon = html`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
`;
