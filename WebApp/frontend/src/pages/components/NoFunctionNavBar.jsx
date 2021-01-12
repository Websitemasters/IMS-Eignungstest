//Import unter anderem auch das Kanti Logo in Weiss
import React, { useState } from "react";
import image from "../res/kantiBadenLogoWeiss.png";
import axios from "axios";
import { useHistory } from 'react-router-dom';

//Nicht funktionierende Navbar
export default function NavBar() {
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
        axios.get(`http://localhost:8080/api/public/adminAccess?code=${input}`)
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
            <img src={image} className="websiteName" height="40" width="70" alt="Kanti Logo" />
            <nav>
                <ul className="nav__links">
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
