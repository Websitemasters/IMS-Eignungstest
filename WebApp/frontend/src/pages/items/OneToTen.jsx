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
    const add = (e) => {
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
                <div className="contentInfo1">
                    <div className="question">
                        <h1>{frage}</h1>
                        <Link to={`/Items/${nextPage - 2}`}>
                            Zurück
                    </Link>
                    </div>
                    <div className="form">
                        <form>
                            <select id="items" onChange={add}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </form>
                        <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                            <button>Ja</button>
                        </Link>
                    </div>
                    <Link to={lastPage === "true" ? "/Ausgabe" : `/Items/${nextPage}`}>
                        <button>Ja</button>
                    </Link>
                </div>
                <Progressionbar progress={progress} style={styleProg} />
            </div>
        </div >
    )
}

export default OneToTen;
