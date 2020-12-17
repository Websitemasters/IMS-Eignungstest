import React from "react";
import { Link } from "react-router-dom";

export default function Home({ getIdFunction }) {
  return (
    <div className="home">
      <div className="plate">
        <div className="contentInfo1">
          <div className="title">
            <Link to="/Items/1" onClick={getIdFunction}>
              Starte Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}