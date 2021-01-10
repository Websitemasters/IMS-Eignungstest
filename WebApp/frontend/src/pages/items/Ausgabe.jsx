import React, { useEffect } from "react";
import Axios from "axios";
import Progressionbar from "../components/Progressionbar";
import * as FaIcons from "react-icons/fa";

function Ausgabe({ items, sendeAktivitaet, userID, setTestDone, progress, setProgress }) {
  const [ausgabe, setAusgabe] = React.useState([]);
  const [styleProg, setStyleProg] = React.useState("");
  useEffect(() => {
    setStyleProg("ausgabeProgress");
    setProgress(100);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
    getEignung();
    setTestDone(true);
  }, []);
  const getEignung = async () => {
    Axios.post(`/api/public/rechneEignung?id=${userID}`, items)
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

export default Ausgabe;