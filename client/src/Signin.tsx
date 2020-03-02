import * as React from "react";
import { RouteComponentProps } from "react-router";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

const auth0Client = async (): Promise<Auth0Client> => {
  return createAuth0Client({
    domain: "high-pine.auth0.com",
    client_id: "YOUR-CLIENT-ID-HERE"
  });
};

const loginWithPopup = async () => {
  const c = await auth0Client();
  await c.loginWithPopup();
};

export default function Signin(_: RouteComponentProps) {
  return (
    <div>
      <h2>Signin</h2>
      <button onClick={async () => await loginWithPopup()}>Signin</button>
    </div>
  );
}
