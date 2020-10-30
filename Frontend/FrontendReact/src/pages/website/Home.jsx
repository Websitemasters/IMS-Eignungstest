import React from "react";

export default function Home({sendLocation}) {
  React.useEffect(()=>{
    sendLocation.sendLocation("/Home");
  },[]);
  return (
    <div className="centerContent">
      <h1>Home</h1>
      <br />
      <p>
        Auf dieser Seite werden wir die Daten unserer Restful Spring Api Fetchen
        und die Fragen ausgeben
      </p>
    </div>
  );
}