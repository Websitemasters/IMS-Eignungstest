import React from "react";
import sendLocations from "../routes/sendLocations";

export default function Home() {
  React.useEffect(()=>{
    sendLocations.sendLocation("/Home");
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