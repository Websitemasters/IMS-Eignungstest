import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as VSCIcons from "react-icons/vsc";
import * as IoIosIcons from "react-icons/io";

export default function Code({ frage, nextPage, lastPage, items, sendeAktivitaet, userID }) {
    React.useEffect(() => {
        sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID);
    }, []);
    const [inputCode, setInputCode] = useState("");
    const [outPut, setCode] = useState("");
    const setInput = (e) => {
        setInputCode(e.target.value);
    }
    const runCode = async () => {
        axios.post(`http://localhost:8080/api/useParser`, {
            id: 1,
            text: inputCode,
        })
            .then((response) => {
                console.log(response);
                setCode(response.data);
            })
            .catch((error) => {
                console.log(error);
                setCode("Error");
            })
    }
    return (
        <div className="coding">
            <div className="plate">
                <div className="content1">
                    <h1>Code Editor</h1>
                    <p>{frage}</p>
                </div>
                <div className="content2">
                    <textarea defaultValue={items[nextPage - 2].code} onChange={setInput} className="in" />
                    <textarea defaultValue={outPut} className="out" />
                </div>
                <div className="content4">
                    <button onClick={runCode} className="run">
                        <VSCIcons.VscDebugStart size={25} />
                    </button>
                    <Link className="nextPage" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                        <p>Next Page</p>
                    </Link>
                </div>
            </div>
        </div >
    )
}