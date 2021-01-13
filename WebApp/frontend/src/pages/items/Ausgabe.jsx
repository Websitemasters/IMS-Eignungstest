//Imports
import React, { useEffect, useState } from "react";
import Axios from "axios";
//Erfüllungsanzeige
import Progressionbar from "../components/Progressionbar";
//Icon von React Icon
import * as FaIcons from "react-icons/fa";

//Component welcher die Test Ausgabe anzeigt
export default function Ausgabe({ items, sendeAktivitaet, userID, setTestDone, progress, setProgress }) {
  //Text der Ausgabe als Array gespeichert
  const [ausgabe, setAusgabe] = useState([]);
  //Style der Erfüllungsanzeige
  const [styleProg, setStyleProg] = useState("");
  //Setzt den Style der Erfüllungsanzeige, setzten der Erfüllung, senden des Standorts, setzte Test Fertig, hole die Eignung
  useEffect(() => {
    setStyleProg("ausgabeProgress");
    setProgress(100);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
    getEignung();
    setTestDone(true);
  }, []);
  //Hole die Eignung je nach Antwort und speichere diese auch in der Datenbank an den Benutzer
  const getEignung = async () => {
    Axios.post(`/api/public/rechneEignung?id=${userID}`, items)
      .then((res) => {
        setAusgabe(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  //Anzeige
  return (
    <div className="ausgabe">
      <div className="plate">
        <div className="contentInfo">
          <div className="title">
            <p>Ausgabe</p>
          </div>
          <div className="bulletPoints">
            <div className="prozentPoint">
              <FaIcons.FaPercentage color="white" size={55} />
              <p>{ausgabe[0]}</p>
            </div>
            {ausgabe.map((items, index) => {
              if (index !== 0) {
                return (
                  <div className="point" key={index}>
                    <h4>{`Punkt ${index}`}</h4>
                    <p>{items}</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
        <Progressionbar progress={progress} style={styleProg} />
      </div>
    </div>
  );
}
