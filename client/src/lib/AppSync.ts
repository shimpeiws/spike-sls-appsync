import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { GRAPH_QL_ENDPOINT, AWS_REGION } from "../Constants";
import { getTokenSilentry } from "./Auth0";

export const client = async () => {
  const token = await getTokenSilentry();
  return new AWSAppSyncClient({
    url: GRAPH_QL_ENDPOINT,
    region: AWS_REGION,
    auth: {
      type: AUTH_TYPE.OPENID_CONNECT,
      jwtToken: token
    }
  });
};
