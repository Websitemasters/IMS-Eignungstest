import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Question({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID }) {
  React.useEffect(() => {
    sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID);
  }, []);

  const location = useLocation();
  var idOfQuestion = location.pathname.substring(7, location.pathname.length);
  var intId = parseInt(idOfQuestion);

  const add = (e) => {
    setItems(
      items.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            antwort: parseInt(e.target.id),
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
              <button id="4" onClick={add}>
                <p>Immer</p>
              </button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="3" onClick={add}>
                <p>Oft</p>
              </button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="2" onClick={add}>
                <p>Manchmal</p>
              </button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="1" onClick={add}>
                <p>Selten</p>
              </button>
            </Link>
            <Link className="linkbutton" to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
              <button id="0" onClick={add}>
                <p>Nie</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}