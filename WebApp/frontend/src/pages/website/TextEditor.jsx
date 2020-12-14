import React, { useState } from "react";
import axios from "axios";
import * as VSCIcons from "react-icons/vsc";
import * as IoIosIcons from "react-icons/io";

export default function TextEditor({ sendeAktivitaet, userID }) {
    React.useEffect(() => {
        sendeAktivitaet.sendeAktivitaet("/Code", userID);
    }, []);
    const [inputCode, setInputCode] = useState("");
    const [outPut, setCode] = useState("");
    const [help, setHelp] = useState("");
    const setInput = (e) => {
        setInputCode(e.target.value);
    }
    const showHelp = () => {
        setHelp("x=55 \n return x");
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
                <div className="content1">
                    <h1>Code Editor</h1>
                    <p>{help}</p>
                    <p>Ändern sie den Code so das die Ausgabe von 55 entsteht</p>
                </div>
                <div className="content2">
                    <textarea defaultValue={inputCode} onChange={setInput} className="in" />
                    <textarea defaultValue={outPut} className="out" />
                </div>
                <div className="content4">
                    <button onClick={runCode} className="run">
                        <VSCIcons.VscDebugStart size={25} />
                    </button>
                    <button onClick={showHelp} className="info">
                        <IoIosIcons.IoIosHelpCircle size={25} color="black" />
                    </button>
                </div>
            </div>
        </div>
    )
}