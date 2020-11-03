import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function Root(){
    const id =1;
    return (<App id={id}/>)
}
ReactDOM.render(<App />, document.getElementById("root"));
