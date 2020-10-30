import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <h1 className="websiteName">Kanti IMS</h1>
      <nav>
        <ul className="nav__links">
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Questions/1">Test</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
        </ul>
      </nav>
      <a className="cta">
        <button>Contact</button>
      </a>
    </header>
  );
}
