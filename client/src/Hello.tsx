import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { GRAPH_QL_ENDPOINT, APPSYNC_API_KEY } from "./Constants";

export default function Hello(_: RouteComponentProps) {
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
    };
    init();
  }, []);
  return <div>Hello</div>;
}
