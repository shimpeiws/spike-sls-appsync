import { APIGatewayProxyHandler } from "aws-lambda";
import { ManagementClient } from "auth0";

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
  const auth0Client = new ManagementClient({
    domain: "YOUR-DOMAIN",
    clientId: "YOUR-CLIENT-ID",
    clientSecret: "YOUR-CLIENT-SECRET",
    scope: "create:users"
  });
  await auth0Client.createUser({
    email: "test@example.com",
    password: "your-password"
  });
  callback(null, {
    id: "uuid",
    name: "name",
    createdAt: "2020-02-25T03:10:36.479Z"
  });
};
