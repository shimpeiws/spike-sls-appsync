import * as React from "react";
import axios from "axios";
import { GRAPH_QL_ENDPOINT } from "./Constants";
import { getTokenSilentry } from "./lib/Auth0";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

interface User {
  id: string;
  providerId: string;
  providerName: string;
  createdAt: string;
}

const listUser = gql`
  query {
    listUser {
      id
      providerId
      providerName
      createdAt
    }
  }
`;

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

interface Props {
  users: User[];
}

const User: React.FC<Props> = props => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  console.info("props.users", props.users);
  return (
    <div>
      <h2>User</h2>
      {props.users.map(user => {
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
};

export default graphql(listUser, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: (props: any) => {
    console.info("props", props);
    return {
      users: props.data && props.data.listUser ? props.data.listUser : []
    };
  }
})(User);
