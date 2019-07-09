import React from "react";
import {render} from "react-dom";

const node = document.createElement("div");

document.body.appendChild(node);

render(
    <h1>Test</h1>,
    node,
);
