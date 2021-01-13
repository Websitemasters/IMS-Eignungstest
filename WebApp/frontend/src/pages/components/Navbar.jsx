//Import unter anderem auch dass Kanti Logo Weiss
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../res/kantiBadenLogoWeiss.png";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

//Funktioniernde Navabr
export default function NavBar() {
  //Style der Verschieden Navbar Sektoren
  const [sec1, setSec1] = useState("linkHighLighted");
  const [sec2, setSec2] = useState("link");
  const [sec3, setSec3] = useState("link");
  let location = useLocation();
  //Checkt wo sich der Benutzer befindet um den Style des jeweiligen Navbar Sektoren zu ändern
  useEffect(() => {
    let path = location.pathname;
    path = path.substring(0, 2);
    if (path === "/") {
      setSec1("linkHighLighted");
      setSec2("link");
      setSec3("link");
    }
    else if (path === "/I" || path === "/A") {
      setSec1("link");
      setSec2("linkHighLighted");
      setSec3("link");
    }
    else if (path === "/C") {
      setSec1("link");
      setSec2("link");
      setSec3("linkHighLighted");
    }
    else {
      setSec1("link");
      setSec2("link");
      setSec3("link");
    }
  }, [location]);

  //Toggle zwischen dem Button oder dem Eingabe Feld
  const [btnorField, setBtnofField] = useState(true)
  const [input, setInput] = useState("");
  const [wrongCode, setWrongCode] = useState(false);
  //URL History um zu pushen falls der Benutzer den Code richtig eingibt um zum Admin login zu kommen
  let history = useHistory();
  const changeShape = () => {
    setBtnofField(!btnorField);
  }
  //Checkt den Code für das Admin Login
  const checkCode = async () => {
    axios.get(`/api/public/adminAccess?code=${input}`)
      .then((res) => {
        if (res.data === true) {
          redirect();
        } else {
          setWrongCode(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //Verändert den Input
  const changeInput = (e) => {
    setInput(e.target.value);
  }
  //Schickt im zu /Admin was einem zuerst zu /Login schickt
  const redirect = () => {
    history.push('/admin')
  }
  //Anzeige
  return (
    <header>
      <Link to="/admin">
        <img src={image} className="websiteName" height="40" width="70" alt="Kanti Logo" />
      </Link>
      <nav>
        <ul className="nav__links">
          <li className={sec1}>
            <Link to="/">
              Home
            </Link>
          </li>
          <li className={sec2}>
            <Link to="/">
              Test
            </Link>
          </li>
          <li className={sec3}>
            <Link to="/Code">
              Code
            </Link>
          </li>
        </ul>
      </nav>
      {btnorField ? (
        <button className="btn" onClick={changeShape}>Login</button>
      ) : (
          <div className="code">
            {wrongCode ? (
              <p className="wrongCode">Falscher Code</p>
            ) : (
                null
              )}
            <input type="text" onChange={changeInput} />
            <button onClick={checkCode}>Bestätigen</button>
            <button onClick={changeShape}>Abbrechen</button>
          </div>
        )}
    </header>
  );
}
