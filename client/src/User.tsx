import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { GRAPH_QL_ENDPOINT, APPSYNC_API_KEY } from "./Constants";

interface User {
  id: string;
  name: string;
  createdAt: string;
}

const createUser = async (name: string) => {
  await axios.post(
    GRAPH_QL_ENDPOINT,
    {
      query: `
            mutation {
              createUser(input: {name: "${name}"}) {
                id,
                name,
                createdAt
              }
            }
            `
    },
    {
      headers: {
        "Content-Type": "application/graphql",
        "x-api-key": APPSYNC_API_KEY
      }
    }
  );
};

export default function User(_: RouteComponentProps) {
  const [name, setName] = React.useState("");
  const [listUser, setListUser] = React.useState([] as User[]);
  React.useEffect(() => {
    const init = async () => {
      const res = await axios.post(
        GRAPH_QL_ENDPOINT,
        {
          query: `
            query {
              listUser {
                id,
                name,
                createdAt
              }
            }
            `
        },
        {
          headers: {
            "Content-Type": "application/graphql",
            "x-api-key": APPSYNC_API_KEY
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
            {user.id}: {user.name}
          </p>
        );
      })}
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => createUser(name)}>CREATE USER</button>
    </div>
  );
}
