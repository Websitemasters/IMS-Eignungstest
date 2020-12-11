
import React, { useEffect } from "react";

function Ausgabe({ items, setItems, sendeAktivitaet, userID }) {
  useEffect(() => {
    console.log(items);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
  }, []);

  return (
    <div className="centerContent">
      <h1>Ausgabe</h1>
      <h3>Sie passen zu 0% der IMS</h3>
    </div>
  );
}

export default Ausgabe;