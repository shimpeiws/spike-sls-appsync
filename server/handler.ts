import { APIGatewayProxyHandler } from "aws-lambda";

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

export const createUser = (_, __, callback) => {
  callback(null, {
    id: "uuid",
    name: "name",
    createdAt: "2020-02-25T03:10:36.479Z"
  });
};
