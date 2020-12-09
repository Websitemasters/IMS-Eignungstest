import React from "react";
import { Link } from "react-router-dom";
import image from "../res/kantiBadenLogoSchwarz.png";

export default function NavBar() {
  return (
    <header>
      <img src={image} className="websiteName" height="40" width="70" />
      <nav>
        <ul className="nav__links">
          <li className="link">
            <Link to="/">
              Home
            </Link>
          </li>
          <li className="link">
            <Link to="/Items/1">Test</Link>
          </li>
          <li className="link">
            <Link to="/Code">Code</Link>
          </li>
        </ul>
      </nav>
      <a className="cta">
        <button>Contact</button>
      </a>
    </header>
  );
}
