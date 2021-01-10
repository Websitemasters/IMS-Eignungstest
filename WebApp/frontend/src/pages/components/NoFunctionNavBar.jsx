import React, { useState } from "react";
import image from "../res/kantiBadenLogoWeiss.png";

export default function NavBar() {
    const [btnorField, setBtnofField] = useState(true)
    const changeShape = () => {
        setBtnofField(!btnorField);
    }
    return (
        <header>
            <img src={image} className="websiteName" height="40" width="70" alt="Kanti Logo" />
            <nav>
                <ul className="nav__links">
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
