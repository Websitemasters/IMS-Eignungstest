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
            <h1>Text Editor</h1>
            <div>
                <textarea rows={10} cols={30} defaultValue={inputCode} onChange={setInput} />
                <textarea rows={10} cols={30} defaultValue={outPut} />
            </div>
            <br />
            <button onClick={runCode}>Run</button>
        </div>
    )
}