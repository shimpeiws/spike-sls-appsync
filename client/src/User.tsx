import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { GRAPH_QL_ENDPOINT } from "./Constants";
import { getTokenSilentry } from "./lib/Auth0";
import { client as AppSyncClient } from "./lib/AppSync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";

interface User {
  id: string;
  providerId: string;
  providerName: string;
  createdAt: string;
}

const createUser = async (email: string, password: string) => {
  const token = await getTokenSilentry();
  await axios.post(
    GRAPH_QL_ENDPOINT,
    {
      query: `
            mutation {
              createUser(input: {email: "${email}", password: "${password}"}) {
                id,
                providerId,
                providerName,
                createdAt
              }
            }
            `
    },
    {
      headers: {
        "Content-Type": "application/graphql",
        Authorization: token
      }
    }
  );
};

export default function User(_: RouteComponentProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [client, setClient] = React.useState(null as unknown);
  React.useEffect(() => {
    const init = async () => {
      const appsyncClient = await AppSyncClient();
      setClient(appsyncClient);
    };
    init();
  }, []);
  if (!client) {
    console.info("return null");
    return null;
  }
  console.info("client", client);
  const appClient = client as AWSAppSyncClient<any>;
  return (
    <ApolloProvider client={appClient}>
      <Rehydrated>
        <div>
          <h2>User</h2>
          <div>
            email:{" "}
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            password:{" "}
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button onClick={() => createUser(email, password)}>
            CREATE USER
          </button>
        </div>
      </Rehydrated>
    </ApolloProvider>
  );
}
