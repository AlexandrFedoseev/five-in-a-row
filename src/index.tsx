import "./assets/scss/compiler.scss";
import "./assets/images/logo.svg";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { HomeComponent } from "./components/home-component";

ReactDOM.render(
    <HomeComponent compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);