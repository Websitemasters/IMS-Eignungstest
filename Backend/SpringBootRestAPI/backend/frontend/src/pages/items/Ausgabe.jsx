import React, { useEffect } from "react";
import Axios from "axios";
import NavBar from "../components/Navbar";

function Ausgabe({ items, sendeAktivitaet, userID }) {
  useEffect(() => {
    console.log(items);
    sendeAktivitaet.sendeAktivitaet("/Ausgabe", userID);
    getEignung();
  }, []);
  const getEignung = async () => {
    Axios.post("http://localhost:8080/api/rechneEignung", items)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className="parent">
      <NavBar />
      <div className="ausgabe">
        <div className="plate">
          <div className="contentInfo1">
            <div className="title">
              <h1>Ausgabe</h1>
            </div>
            <div className="erklaerung">
              <p>
                Durch ihre angaben konnten wir herausfinden das Sie zu 0% zur IMS passen
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ausgabe;