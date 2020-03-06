import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { GRAPH_QL_ENDPOINT } from "./Constants";
import { getTokenSilentry } from "./lib/Auth0";

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
  const [listUser, setListUser] = React.useState([] as User[]);
  React.useEffect(() => {
    const init = async () => {
      const token = await getTokenSilentry();
      const res = await axios.post(
        GRAPH_QL_ENDPOINT,
        {
          query: `
            query {
              listUser {
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
      console.info("res", res.data.data.listUser);
      setListUser(res.data.data.listUser);
    };
    init();
  }, []);
  return (
    <div>
      <h2>User</h2>
      {listUser.map(user => {
        return (
          <p>
            {user.id} | {user.providerId} | {user.providerName} |{" "}
            {user.createdAt}
          </p>
        );
      })}
      <div>
        email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={() => createUser(email, password)}>CREATE USER</button>
    </div>
  );
}
