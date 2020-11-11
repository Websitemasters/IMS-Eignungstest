import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Auth from "./auth";

function LoginPage({sendLocation,id}) {
  React.useEffect(()=>{
    sendLocation.sendLocation("/Login",id);
  },[]);
  let history = useHistory();
  let location = useLocation();
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeVorname = (e) => {
    setVorname(e.target.value);
  };
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    Auth.authenticate(
      () => {
        history.replace(from);
      },
      name,
      vorname
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
        placeholder="Nachname"
        required
        autoComplete="off"
        onChange={changeName}
      />
      <br />
      <input
        type="text"
        placeholder="Vorname"
        required
        autoComplete="off"
        onChange={changeVorname}
      />
      <br />
      <button onClick={login}>Test Starten</button>
    </div>
  );
}

export default LoginPage;
