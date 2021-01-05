import React from 'react'
import { Link, useLocation } from "react-router-dom";
import Progressionbar from "../components/Progressionbar";

function OneToTen({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID, progress, setProgress }) {
    const [styleProg, setStyleProg] = React.useState("");
    React.useEffect(() => {
        setStyleProg("progress");
        setProgress((nextPage - 2) * 10);
        sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID);
    }, []);

    const location = useLocation();
    var idOfQuestion = location.pathname.substring(7, location.pathname.length);
    var intId = parseInt(idOfQuestion);
    const showMe = (e) => {
        setItems(
            items.map((item) => {
                if (item.id === intId) {
                    return {
                        ...item,
                        antwort: parseInt(e.target.value),
                    };
                }
                return item;
            })
        );
    }
    return (
        <div className="item">
            <div className="plate">
                <div className="content">
                    <div className="top">
                        <div className="question">
                            <h1>{frage}</h1>
                        </div>
                        <Link to={`/Items/${nextPage - 2}`}>
                            Zurück
                        </Link>
                    </div>
                    <div className="inputs">
                        <div className="range">
                            <input type="range" min={0} max={10} step="1" defaultValue={0} onChange={showMe} />
                        </div>
                        <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                            Ja
                        </Link>
                    </div>
                </div>
                <Progressionbar progress={progress} style={styleProg} />
            </div>
        </div >
    )
}

export default OneToTen;
