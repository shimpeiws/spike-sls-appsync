import { APIGatewayProxyHandler } from "aws-lambda";
import { ManagementClient, AuthenticationClient } from "auth0";

export const hello: APIGatewayProxyHandler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event
    })
  };
};

export const createUser = async (_, __, callback) => {
  const auth0 = new Auth0.AuthenticationClient({
    domain: "high-pine.auth0.com",
    clientId: "YOUR-CLIENT-ID",
    clientSecret: "YOUR-CLIENT-SECRET"
  });
  console.log(auth0);
  const credentials = await auth0.clientCredentialsGrant({
    audience: "https://high-pine.auth0.com/api/v2/"
  });
  console.info("credentials.access_token", credentials.access_token);
  const management = new ManagementClient({
    token: credentials.access_token,
    domain: "high-pine.auth0.com"
  });
  const res = await management.createUser({
    email: "test@example.com",
    password: "password",
    connection: "Username-Password-Authentication"
  });
  console.info("res = ", res);
  callback(null, {
    id: "uuid",
    name: "name",
    createdAt: "2020-02-25T03:10:36.479Z"
  });
};
