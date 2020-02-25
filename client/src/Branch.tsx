import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { GRAPH_QL_ENDPOINT, APPSYNC_API_KEY } from "./Constants";

interface Branch {
  id: string;
  companyId: string;
  name: string;
  createdAt: string;
}

interface Company {
  id: string;
  name: string;
  createdAt: string;
}

const fetchBranch = async () => {
  return axios.post(
    GRAPH_QL_ENDPOINT,
    {
      query: `
            query {
              listBranch {
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

const fetchCompany = async () => {
  return axios.post(
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
};

const createBranch = async (name: string, companyID: string) => {
  console.info("name", name);
  console.info("companyID", companyID);
  await axios.post(
    GRAPH_QL_ENDPOINT,
    {
      query: `
            mutation {
              createBranch(input: {name: "${name}", companyID: "${companyID}"}) {
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

export default function Branch(_: RouteComponentProps) {
  const [name, setName] = React.useState("");
  const [listBranch, setListBranch] = React.useState([] as Branch[]);
  const [listCompany, setListCompany] = React.useState([] as Company[]);
  const [selectedCompanyID, setSelectedCompanyID] = React.useState("");
  React.useEffect(() => {
    const init = async () => {
      const res = await Promise.all([fetchBranch(), fetchCompany()]);
      console.info("res", res);
      setListBranch(res[0].data.data.listBranch);
      setListCompany(res[1].data.data.listCompany);
    };
    init();
  }, []);
  React.useEffect(() => {
    if (listCompany.length === 0) {
      return;
    }
    console.info("listCompany", listCompany);
    setSelectedCompanyID(listCompany[0].id);
  }, listCompany);
  return (
    <div>
      <h2>Branch</h2>
      {listBranch.map(branch => {
        return (
          <p>
            {branch.id}: {branch.name}
          </p>
        );
      })}
      <input value={name} onChange={e => setName(e.target.value)} />
      <select
        value={selectedCompanyID}
        onChange={event => {
          console.info("event.target.value", event.target.value);
          setSelectedCompanyID(event.target.value);
        }}
      >
        {listCompany.map(company => {
          return <option value={company.id}>{company.name}</option>;
        })}
      </select>
      <button onClick={() => createBranch(name, selectedCompanyID)}>
        CREATE BRANCH
      </button>
    </div>
  );
}
