import * as React from "react";
import { Switch } from "react-router";
import { Link, Route } from "react-router-dom";
import Hello from "./Hello";

export class Routes extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>spike-sls-appsync</h1>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/company">Company</Link>
        </li>
        <li>
          <Link to="/branch">Branch</Link>
        </li>
        <Switch>
          <Route exact path="/user" component={Hello} />
          <Route exact path="/branch" component={Hello} />
          <Route exact path="/company" component={Hello} />
        </Switch>
      </div>
    );
  }
}
