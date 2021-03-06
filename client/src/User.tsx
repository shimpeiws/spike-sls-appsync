import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { graphqlMutation } from "aws-appsync-react";
import { buildSubscription } from "aws-appsync";

interface Company {
  id: string;
  name: string;
}

interface User {
  id: string;
  providerId: string;
  providerName: string;
  createdAt: string;
  company: Company;
}

const listUser = gql`
  query {
    listUser {
      id
      providerId
      providerName
      createdAt
      company {
        id
        name
      }
    }
  }
`;

const createUser = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      id
      providerId
      providerName
      createdAt
    }
  }
`;

const userSubscription = gql`
  subscription postSubscription {
    onNewUserCreated {
      id
      providerId
      providerName
      createdAt
    }
  }
`;

interface Props {
  users: User[];
  createUser: any;
  data: any;
}

const User: React.FC<Props> = props => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  React.useEffect(() => {
    props.data.subscribeToMore(buildSubscription(userSubscription, listUser));
  }, []);
  console.info("props.users", props.users);
  return (
    <div>
      <h2>User</h2>
      {props.users.map(user => {
        return (
          <>
            <p>User</p>
            <p>
              {user.id} | {user.providerId} | {user.providerName} |{" "}
              {user.createdAt}
            </p>
            <p>Company</p>
            <p>
              {user.company.id} | {user.company.name}
            </p>
          </>
        );
      })}
      <div>
        email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={() => props.createUser({ email, password })}>
        CREATE USER
      </button>
    </div>
  );
};

export default compose(
  graphql(listUser, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: (props: any) => ({
      users: props.data && props.data.listUser ? props.data.listUser : [],
      data: props.data
    })
  }),
  graphqlMutation(createUser, listUser, "User")
)(User);
