"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h, Component } from "../lib/preact@10.6.4.js";
import { Letters, State } from "../constants.js";
import { GuessesContainer, Header, Keyboard } from "./index.js";

const html = htm.bind(h);


export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			previousGuessInfo: [],
			guess: "",
			charStates: Object.fromEntries(Letters.map(c => [c, State.UNKNOWN])),
			finished: false
		};

		this.onPhysicalKeyDown = this.onPhysicalKeyDown.bind(this);
		this.onVirtualKeyDown = this.onVirtualKeyDown.bind(this);
	}


	render(props, state) {
		return html`
			<${Header} />

			<main>
				<${GuessesContainer} previousGuessInfo=${state.previousGuessInfo} guess=${state.guess} submitFunc=${this.submitGuess} />

				<${Keyboard} charStates=${state.charStates} keyDownFunc=${this.onVirtualKeyDown} />
			</main>
		`;
	}


	componentDidMount() {
		window.addEventListener("keydown", this.onPhysicalKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onPhysicalKeyDown);
	}


	onPhysicalKeyDown(e) {
		if(e.metaKey) {
			return;
		}

		e.preventDefault();

		if(Letters.includes(e.key)) {
			if(this.state.guess.length < 5) {
				this.setState({ guess: this.state.guess + e.key });
			}
		}
		else if(e.key === "Backspace") {
			if(this.state.guess.length > 0) {
				this.setState({ guess: this.state.guess.slice(0, this.state.guess.length - 1) });
			}
		}
		else if(e.key === "Enter") {
			if(this.state.guess.length === 5) {
				this.submitGuess().then(resp => {
					if(resp.error) {
						console.error(resp.error);
					}
					else {
						if(!resp.error) {
							this.setState({
								previousGuessInfo: [...this.state.previousGuessInfo, resp],
								guess: "",
								finished: resp.isCorrect
							});
						}
						this.updateCharacterInformation(resp.letters);
					}
				});
			}
		}
	}


	async submitGuess() {
		if(this.state.guess.length !== 5) {
			return
		}

		const resp = await fetch(`/api/validate?guess=${encodeURIComponent(this.state.guess)}`);
		if(!resp.ok) {
			console.error(resp.statusText);
			alert("Oops something went wrong. Please try again later");
			return;
		}

		const respBody = await resp.json();
		return respBody;
	}


	updateCharacterInformation(letters) {
		const charStates = this.state.charStates;

		for(const letterInfo of letters) {
			charStates[letterInfo.guess] = letterInfo.state;
		}

		this.setState({
			charStates: charStates
		});
	}


	onVirtualKeyDown(char) {
		const fakeKeyDownEvent = { key: char, preventDefault: () => {} };
		this.onPhysicalKeyDown(fakeKeyDownEvent);
	}

}
