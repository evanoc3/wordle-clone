"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h, Component } from "../lib/preact@10.6.4.js";
import { Popup } from "./index.js";
import localStorageManager from "../LocalStorageManager.js";

const html = htm.bind(h);


export default class StatsPopup extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null
		};
	}


	render(props, state) {
		return html`
			<${Popup} showing=${props.showing} setShowingFunc=${props.setShowingFunc} id="stats-popup">
				<h2>Stats</h2>

				<div id="stats-row">
					${
						state.data ? html`
							<div class="stat-container">
								<div class="stat">${this.#getNumberOfDaysPlayed()}</div>
								<span class="stat-label">Days played</span>
							</div>
						` : ""
					}

					${
						state.data ? html`
							<div class="stat-container">
								<div class="stat">${this.#getWinPercentage()}</div>
								<div class="stat-label">Win %</div>
							</div>
						` : ""
					}

					${
						state.data ? html`
							<div class="stat-container">
								<div class="stat">${this.#getCurrentStreak()}</div>
								<div class="stat-label">Current streak</div>
							</div>
						` : ""
					}

					${
						state.data ? html`
							<div class="stat-container">
								<div class="stat">${this.#getMaxStreak()}</div>
								<div class="stat-label">Max streak</div>
							</div>
						` : ""
					}
				</div>
			</${Popup}>
		`;
	}


	componentDidUpdate(prevProps) {
		if(!prevProps.showing && this.props.showing) {
			this.setState({
				data: localStorageManager.getAllState()
			});
		}
	}


	#getNumberOfDaysPlayed() {
		if(!this.state.data) {
			return;
		}

		const playedDays = Object.keys(this.state.data).filter(day => {
			return this.state.data[day].finished || this.state.data[day].guess.length || this.state.data[day].previousGuessInfo.length;
		}).length;

		return playedDays;
	}


	#getWinPercentage() {
		if(!this.state.data) {
			return;
		}

		const gameWinStatus = Object.keys(this.state.data).map(day => this.state.data[day].finished);
		const totalDaysPlayed = gameWinStatus.length;
		const totalDaysWon = gameWinStatus.filter(won => won).length;

		return Math.round(totalDaysWon / totalDaysPlayed * 100);
	}


	#getStreak(day) {
		let counter = 0;

		while(day in this.state.data && this.state.data[day].finished) {
			counter++;
			day--;
		}

		return counter;
	}


	#getCurrentStreak() {
		// Streak should be up to yesterday if today's puzzle is not finished, and include today if it is
		let streakEndDay = localStorageManager.day - 1; 
		if(this.state.data[localStorageManager.day].finished) {
			streakEndDay++;
		}

		return this.#getStreak(streakEndDay);
	}


	#getMaxStreak() {
		const streaks = Object.keys(this.state.data).map(day => this.#getStreak(day));
		return Math.max(...streaks);
	}

}
