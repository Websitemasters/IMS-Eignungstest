import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import Progressionbar from "../components/Progressionbar";

function OneToTen({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID, progress, setProgress }) {
    const [styleProg, setStyleProg] = React.useState("");
    React.useEffect(() => {
        setStyleProg("progress");
        setProgress((nextPage - 2) * 10);
        sendeAktivitaet.sendeAktivitaet(`/Items/${nextPage - 1}`, userID)
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
    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, [])
    const alertUser = e => {
        e.preventDefault()
        e.returnValue = ''
    }
    return (
        <div className="item">
            <div className="plate">
                <div className="content">
                    <div className="top">
                        <div className="question">
                            <h1>{frage}</h1>
                            <p>10 ist trifft komplett zu und 0 ist trifft gar nicht zu</p>
                        </div>
                        <Link to={`/Items/${nextPage - 2}`}>
                            Zurück
                        </Link>
                    </div>
                    <div className="inputs">
                        <div className="range">
                            <h2>Wert: {items[intId - 1].antwort}</h2>
                            <input type="range" min={0} max={10} step="1" defaultValue={items[intId - 1].antwort} onChange={showMe} style={{ background: `linear-gradient(90deg, blue ${items[intId - 1].antwort * 10}%,white ${items[intId - 1].antwort * 10}%)` }} />
                            <div className="maxmin">
                                <p>0 (min)</p>
                                <p>10 (max)</p>
                            </div>
                        </div>
                        <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                            Weiter
                        </Link>
                    </div>
                </div>
                <Progressionbar progress={progress} style={styleProg} />
            </div>
        </div >
    )
}

export default OneToTen;
