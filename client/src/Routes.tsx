import * as React from "react";
import { Switch } from "react-router";
import { Link, Route } from "react-router-dom";
import User from "./User";
import Branch from "./Branch";
import Company from "./Company";
import Signin from "./Signin";

import { client as AppSyncClient } from "./lib/AppSync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";

export const Routes: React.FC<any> = props => {
  const [client, setClient] = React.useState(null as unknown);
  React.useEffect(() => {
    const init = async () => {
      const appsyncClient = await AppSyncClient();
      setClient(appsyncClient);
    };
    init();
  }, []);
  if (!client) {
    return null;
  }
  const appClient = client as AWSAppSyncClient<any>;
  return (
    <ApolloProvider client={appClient}>
      <Rehydrated>
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
      </Rehydrated>
    </ApolloProvider>
  );
};
