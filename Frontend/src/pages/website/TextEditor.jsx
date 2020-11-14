import React,{useState} from "react";
import axios from "axios";

export default function TextEditor(){
    const [inputCode,setInputCode] = useState("");
    const [outPut,setCode] = useState("");
    const runCode= async () =>{
        axios.get("")
    }
    return (
        <div className="coding">
            <h1>Text Editor</h1>
            <div>
                <textarea rows={20} cols={50} defaultValue={""} />
                <textarea rows={20} cols={50} defaultValue={""} />
            </div>
            <br/>
            <button>Run</button>
        </div>
    )
}