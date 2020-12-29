import React, { useEffect } from "react";
import Axios from "axios";
import Progressionbar from "../components/Progressionbar";

function Ausgabe({ items, sendeAktivitaet, userID, setTestDone, progress, setProgress }) {
  const [ausgabe, setAusgabe] = React.useState("");
  const [styleProg, setStyleProg] = React.useState("");
  useEffect(() => {
    setStyleProg("ausgabeProgress");
    setProgress(100);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
    getEignung();
    setTestDone(true);
  }, []);
  const getEignung = async () => {
    Axios.post(`http://localhost:8080/api/rechneEignung?id=${userID}`, items)
      .then((res) => {
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
        <Progressionbar progress={progress} style={styleProg} />
      </div>
    </div>
  );
}

export default Ausgabe;