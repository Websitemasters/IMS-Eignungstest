import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function Root(){
    const [id,setId] = React.useState("");
    React.useEffect(()=>{
        setId("4");
    },[]);
    return (<App id={id}/>)
}
ReactDOM.render(<Root />, document.getElementById("root"));
