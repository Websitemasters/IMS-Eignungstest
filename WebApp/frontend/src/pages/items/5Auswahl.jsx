import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "../components/Progressionbar";

export default function Question({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID }) {
  React.useEffect(() => {
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
          </div>
          <div className="auswahl">
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="5" onClick={add}>Immer</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="4" onClick={add}>Oft</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="3" onClick={add}>Manchmal</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="2" onClick={add}>Selten</button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="1" onClick={add}>Nie</button>
            </Link>
          </div>
          <div className="holderProgressBar">
            <div className="progressBar">
            </div>
            <div className="progress">
            </div>
            <div className="prozent">
              <span>70%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}