import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

function Root(){
    const [id,setId] = React.useState("");
    React.useEffect(()=>{
        axios.get("http://localhost:8080/addUser")
        .then((response)=>{
            console.log(response.data);
            setId(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[]);
    return (<App id={id}/>)
}
ReactDOM.render(<App />, document.getElementById("root"));