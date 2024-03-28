"use strict";

import htm from "./lib/htm@3.1.0.js"
import { h, render } from "./lib/preact@10.6.4.js";
import App from "./components/App.js";

const html = htm.bind(h);


render(html`<${App} />`, document.body);
