import React, { useEffect } from "react";
import Axios from "axios";

function Ausgabe({ items, sendeAktivitaet, userID, setTestDone }) {
  const [ausgabe, setAusgabe] = React.useState("");
  useEffect(() => {
    console.log(items);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
    getEignung();
    setTestDone(true);
  }, []);
  const getEignung = async () => {
    Axios.post(`http://localhost:8080/api/rechneEignung?id=${userID}`, items)
      .then((res) => {
        console.log(res.data);
        setAusgabe(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className="ausgabe">
      <div className="plate">
        <div className="contentInfo1">
          <div className="title">
            <h1>Ausgabe</h1>
          </div>
          <div className="erklaerung">
            <p>
              {ausgabe}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ausgabe;