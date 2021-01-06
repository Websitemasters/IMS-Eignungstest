import React from "react";
import { Link, useLocation } from "react-router-dom";
import Progressionbar from "../components/Progressionbar";

export default function Question({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID, progress, setProgress }) {
  const [styleProg, setStyleProg] = React.useState("");
  React.useEffect(() => {
    setStyleProg("progress");
    setProgress((nextPage - 2) * 10);
    sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID);
  }, []);

  const location = useLocation();
  var idOfQuestion = location.pathname.substring(7, location.pathname.length);
  var intId = parseInt(idOfQuestion);
  //Fix needed here
  const add = (e) => {
    setItems(
      items.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            antwort: 2 * parseInt(e.target.id),
          };
        }
        return item;
      })
    );
  }
  return (
    <div className="choices5">
      <div className="plate">
        <div className="contentInfo1">
          <div className="question">
            <p>{frage}</p>
            <Link to={`/Items/${nextPage - 2}`}>
              Zurück
            </Link>
          </div>
          <div className="auswahl">
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="5" onClick={add}>1. Trifft zu</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="4" onClick={add}>2. Ziemlich</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="3" onClick={add}>3. Ein bisschen</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="2" onClick={add}>4. Wenig</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="1" onClick={add}>5. Gar nicht</button>
            </Link>
          </div>
        </div>
        <Progressionbar progress={progress} style={styleProg} />
      </div>
    </div>
  );
}