
import Axios from "axios";
import React, { useState, useEffect } from "react";

function Ausgabe({ userAntworten, setUserAntworten, initial, sendeAktivitaet, userID }) {
  let sum = "";
  const [res, setRes] = useState("");

  useEffect(() => {
    for (let i = 0; i < userAntworten.length; i++) {
      sum = sum.concat(userAntworten[i].zahl);
    }
    auswerten();
    ini();
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
  }, []);

  const auswerten = async () => {
    let prozentZahl = 0;
    Axios.post("http://localhost:8080/calculateRate", {
      id: 1,
      antwort: sum
    })
      .then((response) => {
        prozentZahl = response.data;
        console.log(response.data);
        setRes(response.data);
        Axios.post("http://localhost:8080/sendErgebis", {
          id: userID,
          answers: response.data,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const ini = async () => {
    //Um Daten Initial wieder zu Setzten
    const fetchData = await fetch("http://localhost:8080/getAllQuestion");
    const questions = await fetchData.json();
    for (let i = 1; i <= questions.length; i++) {
      initial = [...initial, { id: i, zahl: 0 }];
    }
    setUserAntworten(initial);
  }
  return (
    <div className="centerContent">
      <h1>Ausgabe</h1>
      <h3>Sie passen zu {res}% der IMS</h3>
    </div>
  );
}

export default Ausgabe;