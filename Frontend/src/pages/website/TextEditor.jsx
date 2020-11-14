import React,{useState} from "react";
import axios from "axios";

export default function TextEditor(){
    const [inputCode,setInputCode] = useState("");
    const [outPut,setCode] = useState("");
    const setInput = (e) =>{
        setInputCode(e.target.value);
    }
    const runCode= async () =>{
        var code = inputCode;
        code = code.replaceAll('>','!');
        code = code.replaceAll('<','_');
        code = code.replaceAll('+','"');
        console.log(code);
        axios.get(`http://localhost:8080/useParser?code=${code}`)
        .then((response)=>{
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div className="coding">
            <h1>Text Editor</h1>
            <div>
                <textarea rows={20} cols={50} defaultValue={inputCode} onChange={setInput} />
                <textarea rows={20} cols={50} defaultValue={outPut} />
            </div>
            <br/>
            <button onClick={runCode}>Run</button>
        </div>
    )
}