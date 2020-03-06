import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";

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

export const createUser = async (event, __, callback) => {
  const resToken = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
    },
    { headers: { "'content-type'": "application/x-www-form-urlencoded" } }
  );
  console.info("resToken.data.access_token", resToken.data.access_token);
  const resCreateUser = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    {
      email: event.email,
      connection: "Username-Password-Authentication",
      password: event.password
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${resToken.data.access_token}`
      }
    }
  );
  console.info("resCreateUser = ", resCreateUser);
  callback(null, {
    id: "uuid",
    name: "name",
    createdAt: "2020-02-25T03:10:36.479Z"
  });
};
