
import Axios from "axios";
import React, { useState, useEffect } from "react";

function Ausgabe({ items, setItems, sendeAktivitaet, userID }) {
  let sum = "";
  const [res, setRes] = useState("");

  useEffect(() => {
    console.log(items)
    for (let i = 0; i < items.length; i++) {
      sum = sum.concat(items[i].antwort);
    }
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
  }, []);

  const auswerten = async () => {
    Axios.post("http://localhost:8080/calculateRate", {
      id: 1,
      antwort: sum
    })
      .then((response) => {
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
      //initial = [...initial, { id: i, zahl: 0 }];
    }
    setItems(1);
  }
  return (
    <div className="centerContent">
      <h1>Ausgabe</h1>
      <h3>Sie passen zu {res}% der IMS</h3>
    </div>
  );
}

export default Ausgabe;