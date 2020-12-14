import React from 'react'
import { Link, useLocation } from "react-router-dom";

function OneToTen({ frage, nextPage, lastPage, items, setItems, sendeAktivitaet, userID }) {
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
                    <h1>{frage}</h1>
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
            </div>
        </div>
    )
}

export default OneToTen;