import React from "react";
import image from "../res/kantiBadenLogoWeiss.png";

export default function NavBar() {
    return (
        <header>
            <img src={image} className="websiteName" height="40" width="70" alt="Kanti Logo" />
            <nav>
                <ul className="nav__links">
                </ul>
            </nav>
            <button><p>Contact</p></button>
        </header>
    );
}
