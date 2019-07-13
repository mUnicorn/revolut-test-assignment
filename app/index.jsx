import {render} from "react-dom";
import App from "./CurrencyExchanger/App";

const node = document.createElement("div");

document.body.appendChild(node);
render(<App />, node);
