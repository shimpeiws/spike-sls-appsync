import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { GRAPH_QL_ENDPOINT, APPSYNC_API_KEY } from "./Constants";

interface Company {
  id: string;
  name: string;
  createdAt: string;
}

const createCompany = async (name: string) => {
  await axios.post(
    GRAPH_QL_ENDPOINT,
    {
      query: `
            mutation {
              createCompany(input: {name: "${name}"}) {
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
  const [listCompany, setListCompany] = React.useState([] as Company[]);
  React.useEffect(() => {
    const init = async () => {
      const res = await axios.post(
        GRAPH_QL_ENDPOINT,
        {
          query: `
            query {
              listCompany {
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
      console.info("res", res.data.data.listCompany);
      setListCompany(res.data.data.listCompany);
    };
    init();
  }, []);
  return (
    <div>
      <h2>Company</h2>
      {listCompany.map(company => {
        return (
          <p>
            {company.id}: {company.name}
          </p>
        );
      })}
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => createCompany(name)}>CREATE COMPANY</button>
    </div>
  );
}
