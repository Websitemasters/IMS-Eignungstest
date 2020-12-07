import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Auth from "./auth";

function LoginPage({ sendLocation, id }) {
  React.useEffect(() => {
    sendLocation.sendLocation("/Login", id);
  }, []);
  let location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  let login = () => {
    Auth.authenticate(
      username,
      password
    );
  };

  return (
    <div className="userdata">
      <p>
        Geben sie bitte Ihre Benutzerdaten ein um den EignungsTest durch zu
        führen
      </p>
      <br />
      <input
        type="text"
        placeholder="Username"
        required
        autoComplete="off"
        onChange={changeUsername}
      />
      <br />
      <input
        type="text"
        placeholder="Password"
        required
        autoComplete="off"
        onChange={changePassword}
      />
      <br />
      <button onClick={login}>Test Starten</button>
    </div>
  );
}

export default LoginPage;
