import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Auth from "./auth";
import "./style/style.css"
import Logo from "./res/LogoSchwarz.png";

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const changeusername = (e) => {
    setusername(e.target.value);
  };
  const changepassword = (e) => {
    setpassword(e.target.value);
  };
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    Auth.authenticate(
      () => {
        history.replace(from);
      },
      username,
      password
    );
  };

  return (
    <div className="loginAdmin">
      <div className="holder">
        <div className="login">
          <h1>Admin Login</h1>
          <p>
            Geben Sie bitte Ihre Benutzerdaten ein um den EignungsTest durchzuführen
          </p>
          <br />
          <input
            type="text"
            placeholder="Benutzername"
            required
            autoComplete="off"
            onChange={changeusername}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="off"
            onChange={changepassword}
          />
          <br />
          <button onClick={login}>Einloggen</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;