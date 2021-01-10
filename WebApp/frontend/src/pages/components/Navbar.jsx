import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../res/kantiBadenLogoWeiss.png";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const [sec1, setSec1] = useState("linkHighLighted");
  const [sec2, setSec2] = useState("link");
  const [sec3, setSec3] = useState("link");
  let location = useLocation();
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
  const [btnorField, setBtnofField] = useState(true)
  const changeShape = () => {
    setBtnofField(!btnorField);
  }
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
            <Link to="/Items/1">
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
            <input type="text" />
            <button>Bestätigen</button>
            <button onClick={changeShape}>Abbrechen</button>
          </div>
        )}
    </header>
  );
}
