"use strict";

import htm from "../htm@3.1.0.js";
import { h, Component } from "../preact@10.6.4.js";
import { Letters, State } from "../constants.js";
import { Footer, GuessesContainer, Header, Keyboard } from "./index.js";

const html = htm.bind(h);


export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			previousGuessInfo: [],
			guess: "honk",
			charStates: Object.fromEntries(Letters.map(c => [c, State.UNKNOWN])),
			finished: false
		};

		this.onKeyDown = this.onKeyDown.bind(this);
	}


	render(props, state) {
		return html`
			<${Header} />

			<main>
				<${GuessesContainer} previousGuessInfo=${state.previousGuessInfo} guess=${state.guess} submitFunc=${this.submitGuess} />

				<${Keyboard} charStates=${state.charStates} />
			</main>

			<${Footer} />
		`;
	}


	componentDidMount() {
		window.addEventListener("keydown", this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown);
	}


	onKeyDown(e) {
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
					this.updateCharacterInformation(resp.letters);
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
			return;
		}

		const respBody = await resp.json();

		if(respBody.error === "Word not recognised") {
			alert("Word not recognised");
			return
		}

		this.setState({
			previousGuessInfo: [...this.state.previousGuessInfo, respBody],
			guess: "",
			finished: respBody.isCorrect
		});

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

}
