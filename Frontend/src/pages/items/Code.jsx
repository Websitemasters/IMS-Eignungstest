import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        axios.post(`http://localhost:8080/useParser`, {
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
            <p>{frage}</p>
            <div>
                <textarea rows={10} cols={30} defaultValue={items.code} onChange={setInput} />
                <textarea rows={10} cols={30} defaultValue={outPut} />
            </div>
            <br />
            <button onClick={runCode}>Run</button>
            <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                <button>Gehe Weiter</button>
            </Link>
        </div>
    )
}