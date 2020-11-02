import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Question({
  name,
  nextPage,
  lastPage,
  auswahl,
  setAuswahl,
  data,
  sendLocation,
}) {
  React.useEffect(()=>{
    sendLocation.sendLocation(`/Questions/${nextPage-1}`);
  },[]);
  const location = useLocation();
  var idOfQuestion = location.pathname.substring(11, location.pathname.length);
  var intId = parseInt(idOfQuestion);
  function add4() {
    setAuswahl(
      auswahl.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            zahl: 4,
          };
        }
        return item;
      })
    );
  }
  function add3() {
    setAuswahl(
      auswahl.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            zahl: 3,
          };
        }
        return item;
      })
    );
  }
  function add2() {
    setAuswahl(
      auswahl.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            zahl: 2,
          };
        }
        return item;
      })
    );
  }
  function add1() {
    setAuswahl(
      auswahl.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            zahl: 1,
          };
        }
        return item;
      })
    );
  }
  function add0() {
    setAuswahl(
      auswahl.map((item) => {
        if (item.id === intId) {
          return {
            ...item,
            zahl: 0,
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
          <button onClick={add4}>Trifft zu</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button onClick={add3}>Oft</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button onClick={add2}>Manchmal</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button onClick={add1}>Selten</button>
        </Link>
        <Link to={lastPage === "true" ? "/Ausgabe" : `/Questions/${nextPage}`}>
          <button onClick={add0}>Nie</button>
        </Link>
      </div>
      <br />
      <ul className="questionSelector">
        {data.map((questions) => (
          <li key={questions.id}>
            <Link to={`/Questions/${questions.id}`}>{questions.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
