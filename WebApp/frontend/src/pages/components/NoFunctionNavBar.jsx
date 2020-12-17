import React from "react";
import { Link } from "react-router-dom";
import image from "../res/kantiBadenLogoWeiss.png";

export default function NavBar() {
    return (
        <header>
            <Link to="/admin">
                <img src={image} className="websiteName" height="40" width="70" alt="Kanti Logo" />
            </Link>
            <nav>
                <ul className="nav__links">
                </ul>
            </nav>
            <button><p>Contact</p></button>
        </header>
    );
}
