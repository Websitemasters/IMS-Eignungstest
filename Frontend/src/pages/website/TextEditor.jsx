import React, { useState } from "react";
import axios from "axios";
import * as VSCIcons from "react-icons/vsc";

export default function TextEditor({ sendeAktivitaet, userID }) {
    React.useEffect(() => {
        sendeAktivitaet.sendeAktivitaet("/Code", userID);
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
            <div className="plate">
                <div className="title">
                    <h1>Text Editor</h1>
                </div>
                <div className="codingArea">
                    <div className="input">
                        <textarea defaultValue={inputCode} onChange={setInput} />
                    </div>
                    <div className="output">
                        <textarea defaultValue={outPut} />
                    </div>
                </div>
                <div className="controlls">
                    <div className="run">
                        <button onClick={runCode}>
                            <VSCIcons.VscDebugStart />
                            <span>Run Code</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}