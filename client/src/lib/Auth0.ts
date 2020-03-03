import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

const auth0Client = async (): Promise<Auth0Client> => {
  return createAuth0Client({
    domain: "high-pine.auth0.com",
    client_id: "YOUR-CLIENT-ID"
  });
};

export const loginWithPopup = async () => {
  const c = await auth0Client();
  await c.loginWithPopup();
};

export const signOut = async () => {
  const c = await auth0Client();
  await c.logout();
};

export const isSignin = async () => {
  const c = await auth0Client();
  return c.isAuthenticated();
};
