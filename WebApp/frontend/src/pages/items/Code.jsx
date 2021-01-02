import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as VSCIcons from "react-icons/vsc";
import Progressionbar from "../components/Progressionbar";

export default function Code({ frage, nextPage, lastPage, items, sendeAktivitaet, userID, progress, setProgress }) {
    const [styleProg, setStyleProg] = useState("");
    React.useEffect(() => {
        setStyleProg("progress");
        setProgress((nextPage - 2) * 10);
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
        <div className="codingTest">
            <div className="plate">
                <div className="content1">
                    <div>
                        <h1>Code Editor</h1>
                        <p>{frage}</p>
                    </div>
                    <Link to={`/Items/${nextPage - 2}`}>
                        Zurück
                    </Link>
                </div>
                <div className="content2">
                    <textarea defaultValue={items[nextPage - 2].code} onChange={setInput} className="in" />
                    <textarea defaultValue={outPut} className="out" />
                </div>
                <div className="content3">
                    <button onClick={runCode} className="run">
                        <VSCIcons.VscDebugStart size={25} />
                    </button>
                    <Link className="nextPage" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                        Next Page
                    </Link>
                </div>
                <Progressionbar progress={progress} style={styleProg} />
            </div>
        </div >
    )
}