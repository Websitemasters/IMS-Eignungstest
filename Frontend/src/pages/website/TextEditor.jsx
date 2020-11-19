import React, { useState } from "react";
import axios from "axios";

export default function TextEditor({sendLocation,id}) {
    React.useEffect(()=>{
        sendLocation.sendLocation("/Code",id);
    },[]);
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
            <div>
                <div className="codeControl">
                    <h1>Text Editor</h1>
                    <button onClick={runCode}>Run</button>
                </div>
                <div className="editor">
                    <textarea rows={8} cols={80} defaultValue={inputCode} onChange={setInput} />
                    <textarea rows={8} cols={30} defaultValue={outPut} />
                </div>
            </div>
        </div>
    )
}