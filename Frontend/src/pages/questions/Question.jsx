import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Question({
  name,
  nextPage,
  lastPage,
  userAntworten,
  setUserAntworten,
  sendeAktivitaet,
  userID,
}) {
  React.useEffect(() => {
    sendeAktivitaet.sendeAktivitaet(`/Questions/${nextPage - 1}`, userID);
  }, []);

  const location = useLocation();
  var idOfQuestion = location.pathname.substring(11, location.pathname.length);
  var intId = parseInt(idOfQuestion);

  const add = (e) => {
    setUserAntworten(
      userAntworten.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            zahl: parseInt(e.target.id),
          };
        }
        return item;
      })
    );
  }
  return (
    <div className="question">
      <p>{name}</p>
      <br />
      <div className="choices">
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button id="4" onClick={add}>Trifft zu</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button id="3" onClick={add}>Oft</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button id="2" onClick={add}>Manchmal</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button id="1" onClick={add}>Selten</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button id="0" onClick={add}>Nie</button>
        </Link>
      </div>
    </div>
  );
}