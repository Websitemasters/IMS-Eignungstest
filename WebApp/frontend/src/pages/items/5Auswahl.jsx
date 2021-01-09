import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Progressionbar from "../components/Progressionbar";

var linkButtonStyles = [
  {
    antwort: 10,
    style: "linkbutton"
  },
  {
    antwort: 8,
    style: "linkbutton"
  },
  {
    antwort: 6,
    style: "linkbutton"
  },
  {
    antwort: 4,
    style: "linkbutton"
  },
  {
    antwort: 2,
    style: "linkbutton"
  }
]
export default function Question({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID, progress, setProgress }) {
  const [styleProg, setStyleProg] = useState("");
  const [styleButtons, setStyleButtons] = useState(linkButtonStyles);
  useEffect(() => {
    setStyleProg("progress");
    setProgress((nextPage - 2) * 10);
    changeStyle();
    sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID);
  }, []);

  const changeStyle = () => {
    if (items[nextPage - 2].antwort !== 0) {
      setStyleButtons(
        styleButtons.map((item) => {
          if (items[nextPage - 2].antwort === item.antwort) {
            return {
              ...item,
              style: "colored"
            }
          }
          else {
            return {
              ...item
            }
          }
        })
      )
    }
  }
  const location = useLocation();
  var idOfQuestion = location.pathname.substring(7, location.pathname.length);
  var intId = parseInt(idOfQuestion);
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
        <div className="contentInfo">
          <div className="back">
            <Link to={`/Items/${nextPage - 2}`}>
              Zurück
            </Link>
          </div>
          <div className="question">
            <p>{frage}</p>
          </div>
          <div className="auswahl">
            <Link className={styleButtons[0].style} to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`} id="5" onClick={add}>
              5. Trifft zu
            </Link>
            <Link className={styleButtons[1].style} to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`} id="4" onClick={add}>
              4. Ziemlich
            </Link>
            <Link className={styleButtons[2].style} to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`} id="3" onClick={add}>
              3. Ein bisschen
            </Link>
            <Link className={styleButtons[3].style} to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`} id="2" onClick={add}>
              2. Wenig
            </Link>
            <Link className={styleButtons[4].style} to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`} id="1" onClick={add}>
              1. Gar nicht
            </Link>
          </div>
        </div>
        <Progressionbar progress={progress} style={styleProg} />
      </div>
    </div>
  );
}