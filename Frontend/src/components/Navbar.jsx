import React from "react";
import { Link } from "react-router-dom";
import image from "../res/image.png";

export default function NavBar() {
  return (
    <header>
      <img src={image} className="websiteName" height="40" width="70"/>
      <nav>
        <ul className="nav__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Questions/1">Test</Link>
          </li>
          <li>
            <Link to="/Code">Code</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
      </nav>
      <a className="cta">
        <button>Contact</button>
      </a>
    </header>
  );
}
