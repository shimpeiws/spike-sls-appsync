import * as React from "react";
import * as ReactDOM from "react-dom";
import { Routes } from "./Routes";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Routes />
  </HashRouter>,
  document.getElementById("app")
);
