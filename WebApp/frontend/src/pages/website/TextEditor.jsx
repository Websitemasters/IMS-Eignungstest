//Imports
import React, { useState } from "react";
import axios from "axios";
//Icon von React Icons
import * as VSCIcons from "react-icons/vsc";

//Der Playground Code Editor welcher man benutzen kann nachdem der Test fertig ist
export default function TextEditor() {
    //Input und Output Code
    const [inputCode, setInputCode] = useState("");
    const [outPut, setCode] = useState("");
    //Verändere den Input Code
    const setInput = (e) => {
        setInputCode(e.target.value);
    }
    //Führe Code aus
    const runCode = async () => {
        axios.post(`/api/public/useParser`, {
            id: 1,
            text: inputCode,
        })
            .then((response) => {
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
                    <p>Dies ist ein Code Editor wo Sie versuchen können eigenen Code zu schreiben</p>
                </div>
                <div className="content2">
                    <p>Code Eingabe</p>
                    <textarea defaultValue={inputCode} onChange={setInput} className="in" />
                    <p>Ausgabe</p>
                    <div className="out">{outPut}</div>
                </div>
                <div className="content4">
                    <button onClick={runCode} className="run">
                        <VSCIcons.VscDebugStart size={25} />
                        <p>Führe Code aus</p>
                    </button>
                </div>
            </div>
        </div>
    )
}