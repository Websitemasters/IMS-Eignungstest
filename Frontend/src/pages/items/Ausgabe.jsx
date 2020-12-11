
import Axios from "axios";
import React, { useState, useEffect } from "react";

function Ausgabe({ items, setItems, sendeAktivitaet, userID }) {
  let sum = "";
  const [res, setRes] = useState("");

  useEffect(() => {
    console.log(items);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
  }, []);
  
  return (
    <div className="centerContent">
      <h1>Ausgabe</h1>
      <h3>Sie passen zu {res}% der IMS</h3>
    </div>
  );
}

export default Ausgabe;