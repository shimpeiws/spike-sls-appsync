import * as React from "react";
import { Switch } from "react-router";
import { Link, Route } from "react-router-dom";
import User from "./User";
import Branch from "./Branch";
import Company from "./Company";
import Signin from "./Signin";

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
        <li>
          <Link to="/signin">Sginin</Link>
        </li>
        <Switch>
          <Route exact path="/user" component={User} />
          <Route exact path="/branch" component={Branch} />
          <Route exact path="/company" component={Company} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </div>
    );
  }
}
