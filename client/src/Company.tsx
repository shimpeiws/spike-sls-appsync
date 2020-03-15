import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { graphqlMutation } from "aws-appsync-react";

interface Company {
  id: string;
  name: string;
  createdAt: string;
}

const listCompany = gql`
  query {
    listCompany {
      id
      name
      createdAt
    }
  }
`;

const createCompany = gql`
  mutation createCompany($name: String!) {
    createCompany(input: { name: $name }) {
      id
      name
      createdAt
    }
  }
`;

interface Props {
  companies: Company[];
  createCompany: any;
  data: any;
}

const Company: React.FC<Props> = props => {
  const [name, setName] = React.useState("");
  return (
    <div>
      <h2>Company</h2>
      {props.companies.map(company => {
        return (
          <p>
            {company.id}: {company.name}
          </p>
        );
      })}
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => props.createCompany({ name })}>
        CREATE COMPANY
      </button>
    </div>
  );
};

export default compose(
  graphql(listCompany, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: (props: any) => ({
      companies:
        props.data && props.data.listCompany ? props.data.listCompany : [],
      data: props.data
    })
  }),
  graphqlMutation(createCompany, listCompany, "Company")
)(Company);
