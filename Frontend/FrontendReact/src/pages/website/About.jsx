import React from "react";

export default function About({sendLocation}) {
  React.useEffect(()=>{
    sendLocation.sendLocation("/About");
  },[]);  return (
    <div className="centerContent">
      <h1>Kanti Web Project</h1>
      <br />
      <p>
        Unsere IDPA Gruppe(Noah Grand,Shenia Scherer, Andrei Oleniuc) werden
        <br></br>
        einen Eignungstest erstellen welcher für Bezirk und Sekundar Schüler ist
      </p>
    </div>
  );
}
