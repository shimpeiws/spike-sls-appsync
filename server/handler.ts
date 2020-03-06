import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import { DynamoDB as AwsDynamoDB } from "aws-sdk";

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
  console.info("event", event);
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
      email: event.arguments.input.email,
      connection: "Username-Password-Authentication",
      password: event.arguments.input.password
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${resToken.data.access_token}`
      }
    }
  );
  const userId = resCreateUser.data.user_id as string;
  const splited = userId.split("|");
  const providerId = splited[1];
  const providerName = splited[0];

  const dynamo = new AwsDynamoDB.DocumentClient();
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);
  const params = {
    TableName: "appsync-user",
    Item: {
      provider_id: providerId,
      provider_name: providerName,
      created_at: timestamp,
      updated_at: timestamp
    }
  };
  await dynamo.put(params).promise();
  callback(null, {
    id: userId,
    providerId: providerId,
    providerName: providerName,
    createdAt: timestamp
  });
};
