import React from "react";
import { Link } from "react-router-dom";

export default function Home({ getIdFunction, cookieAccept }) {
  return (
    <div className="home">
      <div className="plate">
        <div className="contentInfo1">
          {cookieAccept ? (
            <div className="title">
              <Link to="/Items/1" onClick={getIdFunction}>
                Starte Test
                </Link>
            </div>
          ) :
            (
              <div className="titleCookieNotAccepted">
                <p className="titleNoFunc">Starte Test</p>
                <p className="info">Um den Test zu starten müssen Cookies Akzeptiert werden</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}