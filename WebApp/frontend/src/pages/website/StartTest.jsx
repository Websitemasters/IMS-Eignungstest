import React from "react";
import { Link } from "react-router-dom";

export default function Home({ sendeAktivitaet, userID }) {
  React.useEffect(() => {
    sendeAktivitaet.sendeAktivitaet("/", userID);
  }, []);
  return (
    <div className="home">
      <div className="plate">
        <div className="contentInfo1">
          <div className="title">
            <Link to="/Items/1">
              Starte Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}