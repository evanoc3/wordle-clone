"use strict";

import htm from "../lib/htm@3.1.0.js";
import { h } from "../lib/preact@10.6.4.js";
import { useEffect, useRef } from "../lib/preact-hooks@10.6.4.js";
import { Chart, registerables } from "../lib/chart.js@3.7.0/chart.esm.js";

Chart.register(...registerables);
const html = htm.bind(h);


export default function SolutionDistributionGraph(props) {
	const canvas = useRef(null);
	const chart = useRef(null);


	useEffect(() => {
		if(canvas.current) {
			canvas.current.width = canvas.current.clientWidth;
			canvas.current.height = canvas.current.clientHeight;

			const ctx = canvas.current.getContext("2d");

			chart.current = new Chart(ctx, {
				type: "bar",
				data: {
					labels: Object.keys(props.data),
					datasets: [{
						data: Object.values(props.data),
						backgroundColor: [ getComputedStyle(document.documentElement).getPropertyValue("--distribution-graph-bar-colour") ]
					}]
				},
				options: {
					indexAxis: "y",
					scales: {
						x: {
							ticks: {
								beginAtZero: true,
								stepSize: 1
							}
						}
					},
					plugins: {
						title: {
							display: false
						},
						legend: {
							display: false
						}
					}
				}
			});
		}

		return () => {
			if(chart.current) {
				chart.current.destroy();
			}
		};
	}, []);


	useEffect(() => {
		if(chart.current) {
			chart.current.data.datasets[0].data = Object.values(props.data);
			chart.current.update();
		}
	}, [ props.data ]);

	return html`
		<canvas id="distribution-graph" ref=${canvas}>
		</canvas>
	`;
}
