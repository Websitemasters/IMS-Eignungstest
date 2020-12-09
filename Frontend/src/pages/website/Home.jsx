import React from "react";

export default function Home({ sendeAktivitaet, userID }) {
  React.useEffect(() => {
    sendeAktivitaet.sendeAktivitaet("/", userID);
  }, []);
  return (
    <div className="home">
      <div className="plate">
        <div className="contentInfo1">
          <div className="title">
            <h1>Home</h1>
          </div>
          <div className="erklaerung">
            <p>
              Auf dieser Seite werden Schüler die möglichkeit haben einen Test durchzuführen welcher ihnen verrät ob sie zu der IMS pasen oder nicht
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}