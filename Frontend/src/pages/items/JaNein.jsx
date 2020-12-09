import React from 'react'
import { Link, useLocation } from "react-router-dom";

function JaNein(frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID) {
    React.useEffect(() => {
        sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID);
    }, []);

    const location = useLocation();
    var idOfQuestion = location.pathname.substring(7, location.pathname.length);
    var intId = parseInt(idOfQuestion);

    const add = (e) => {
        setItems(
            items.map((item) => {
                if (item.id === intId) {
                    return {
                        ...item,
                        antwort: parseInt(e.target.id),
                    };
                }
                return item;
            })
        );
    }
    return (
        <div className="question">
            <p>{frage}</p>
            <br />
            <div className="choices">
                <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                    <button id="1" onClick={add}>Ja</button>
                </Link>
                <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                    <button id="0" onClick={add}>Nein</button>
                </Link>
            </div>
        </div>
    );
}

export default JaNein
