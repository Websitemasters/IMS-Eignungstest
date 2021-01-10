import React, { useState } from "react";
import image from "../res/kantiBadenLogoWeiss.png";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function NavBar() {
    const [btnorField, setBtnofField] = useState(true)
    const [input, setInput] = useState("");
    const [wrongCode, setWrongCode] = useState(false);
    let history = useHistory();
    const changeShape = () => {
        setBtnofField(!btnorField);
    }
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
    const changeInput = (e) => {
        setInput(e.target.value);
    }

    const redirect = () => {
        history.push('/admin')
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
