import * as React from "react";
import { RouteComponentProps } from "react-router";
import { loginWithPopup, isSignin, signOut } from "./lib/Auth0";

export default function Signin(_: RouteComponentProps) {
  const [signin, setSignin] = React.useState(false);
  React.useEffect(() => {
    const init = async () => {
      const res = await isSignin();
      console.info("res", res);
      setSignin(res);
    };
    init();
  }, []);
  return (
    <div>
      <h2>Signin</h2>
      {signin ? (
        <>
          <p>already signin</p>
          <button onClick={async () => await signOut()}>Signout</button>
        </>
      ) : (
        <button onClick={async () => await loginWithPopup()}>Signin</button>
      )}
    </div>
  );
}
