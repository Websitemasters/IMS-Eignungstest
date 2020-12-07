import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function Ausgabe({ auswahl, setAuswahl, initial, sendLocation, id }) {
  let sum = "";
  const [res, setRes] = useState("");

  useEffect(() => {
    for (let i = 0; i < auswahl.length; i++) {
      sum = sum.concat(auswahl[i].zahl);
    }
    auswerten();
    ini();
    sendLocation.sendLocation("/Ausgabe", id);
  }, []);

  const auswerten = async () => {
    Axios.post("http://localhost:8080/calculateRate", {
      id: 1,
      antwort: sum
    })
      .then((response) => {
        setRes(response.data);
        sendErgebis(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };
  const sendErgebis = async (procent) => {
    Axios.post("http://localhost:8080/sendErgebis", {
      id: id,
      answers: procent,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const ini = async () => {
    //Um Daten Initial wieder zu Setzten
    const fetchData = await fetch("http://localhost:8080/getAllQuestion");
    const questions = await fetchData.json();
    for (let i = 1; i <= questions.length; i++) {
      initial = [...initial, { id: i, zahl: 0 }];
    }
    setAuswahl(initial);
  }
  return (
    <div className="centerContent">
      <h1>Ausgabe</h1>
      <h3>Sie passen zu {res}% der IMS</h3>
    </div>
  );
}
