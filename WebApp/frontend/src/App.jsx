//React Imports
import React, { useState, useEffect } from "react";

//Styling Klasse
import "./pages/styles/styles.css";

//Webseite Komponente
import NavBar from "./pages/components/Navbar";
import NoFunctionNavBar from "./pages/components/NoFunctionNavBar";

//Verschiedene Seiten
import StartTest from "./pages/website/StartTest";
import Ausgabe from "./pages/items/Ausgabe";
import TextEditor from "./pages/website/TextEditor";
import OneToTen from "./pages/items/OneToTen";
import FiveChoices from "./pages/items/5Auswahl";
import Code from "./pages/items/Code";
import Admin from "./admin/Admin";
import Login from "./auth/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";
import Cookie from "./pages/components/Cookie";

//React Router imports welche uns erlauben je nach URL verschiedene Seiten anzuzeigen
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
//Axios Bibliothek welche wir gebrauchen um Daten von der Rest Api zu fetchen oder an sie zu schicken
import Axios from "axios";
//Lade Zeichen von React Spinners
import { BeatLoader } from "react-spinners";

//Funktion welche den Standort des Besuchers an die Rest API schickt
const sendeAktivitaet = {
    sendeAktivitaet(url, id) {
        Axios.post(`/api/public/logActivity?id=${id}&url=${url}`)
            .catch((error) => {
                console.log(error);
            })
    }
};

function App() {
    //Alle Items
    const [items, setItems] = useState([]);
    //Die User ID des Beuschers
    const [userID, setID] = useState(null);
    //Lade Screen Boolean, Test abgeschlossen Boolean und den Fortschritt des Testes je nach Besuchers
    const [loading, setLoading] = useState(true);
    const [testDone, setTestDone] = useState(false);
    const [progress, setProgress] = useState(10);
    //Cookie annahme und eigentliches Cookie als UseState gespeichert
    const [cookieAccept, setCookieAccept] = useState(false);
    const [cookieMessage, setCookieMessage] = useState(null);
    //UserName und Password des Admin Users
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //Asynchrone Funktion welche die ID des Benutzers speichern soll
    const getIdFunction = async () => {
        try {
            //Zuerst schauen hat der Benutzer in seinem Localen Speicher schon ein Cookie von uns
            setLoading(false);
            const cookies = document.cookie;
            const cookieArray = cookies.split('; ')
            let eignungstestLocation = -1;
            for (let i = 0; i < cookieArray.length; i++) {
                if (cookieArray[i].includes("imseignunstest")) {
                    eignungstestLocation = i;
                }
            }
            //Wenn er keinen hat dann holen wir uns einen von der Api und Speichern in ihm Localen Speicher
            if (eignungstestLocation === -1) {
                Axios.get("/api/public/addBesucher")
                    .then((res) => {
                        let date = new Date();
                        const minutes = 120;
                        date.setTime(date.getTime() + (minutes * 60 * 1000));
                        document.cookie = "imseignunstest=" + res.data + "; expires=" + date
                        setID(res.data);
                        setLoading(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                //Sonst holen wir uns denn heraus
                setID(cookieArray[eignungstestLocation].substring(15, cookieArray[eignungstestLocation].length));
                setLoading(true);
            }
        } catch (e) {
            console.log(e);
        }
    };
    //Asynchrone Mehtode welche die Items von der Rest API Fetched um alle Fragen im Frontend zu haben
    const fetchData = async () => {
        Axios.get("/api/public/getAllItems")
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    //Methode welche am Anfang einmal läuft und dann nicht mehr
    useEffect(() => {
        fetchData();
        //Checken ob Cookie besteht wenn ja darf er Test starten wenn nein muss er die Cookie 
        //Meldung annehmen um zugriff auf die Applikation zu bekommen
        const cookies = document.cookie;
        const cookieArray = cookies.split('; ')
        let accepted = false;
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].includes("imseignunstest")) {
                setCookieMessage(null);
                setCookieAccept(true);
                accepted = true;
            }
        }
        if (!accepted) {
            setCookieMessage(<Cookie setCookieAccept={setCookieAccept} setCookieMessage={setCookieMessage} />)
        }
    }, []);
    return (
        /*
        1. Router welche für verschiedene URLS verschiedenen Content ausgibt.
        2. Cookie Message falls nicht angenommen.
        3. Falls Test fertig ist zeigt man die Funktionierende Navbar angenommen
        4. Switch welcher je nach URL verschiedenen Content anzeigt. 
        5. Jeder Component bekommt Daten mitgeschickt welcher er braucht
        6. Für jedes Item wird ein Component erstellen und je nach Kategorie wird eine andere Frage erstellt
        7. Falls Daten von der Rest API noch nicht da sind wird ein Lade Screen gezeigt.
        */
        <Router Router >
            <div className="parent">
                {cookieMessage}
                {testDone ? (
                    <NavBar />
                ) : (
                        <NoFunctionNavBar />
                    )}
                <br />
                {loading ? (
                    <Switch>
                        <Route exact path="/">
                            <StartTest getIdFunction={getIdFunction} cookieAccept={cookieAccept} />
                        </Route>
                        <Route exact path="/Ausgabe">
                            <Ausgabe
                                items={items}
                                sendeAktivitaet={sendeAktivitaet}
                                userID={userID}
                                setTestDone={setTestDone}
                                progress={progress}
                                setProgress={setProgress}
                            />
                        </Route>
                        <Route exact path="/Code">
                            <TextEditor />
                        </Route>
                        {items.map((item) => {
                            if (item.kategorie === "5choice") {
                                return (
                                    <Route key={item.id} exact path={`/Items/${item.id}`}>
                                        <FiveChoices
                                            frage={item.frage}
                                            nextPage={item.id + 1}
                                            lastPage={item.id === items.length ? "true" : "false"}
                                            items={items}
                                            setItems={setItems}
                                            sendeAktivitaet={sendeAktivitaet}
                                            userID={userID}
                                            progress={progress}
                                            setProgress={setProgress}
                                        />
                                    </Route>
                                )
                            }
                            else if (item.kategorie === "1-10") {
                                return (
                                    <Route key={item.id} exact path={`/Items/${item.id}`}>
                                        <OneToTen
                                            frage={item.frage}
                                            nextPage={item.id + 1}
                                            lastPage={item.id === items.length ? "true" : "false"}
                                            items={items}
                                            setItems={setItems}
                                            sendeAktivitaet={sendeAktivitaet}
                                            userID={userID}
                                            progress={progress}
                                            setProgress={setProgress}
                                        />
                                    </Route>
                                )
                            }
                            else if (item.kategorie === "code") {
                                return (
                                    <Route key={item.id} exact path={`/Items/${item.id}`}>
                                        <Code
                                            frage={item.frage}
                                            nextPage={item.id + 1}
                                            lastPage={item.id === items.length ? "true" : "false"}
                                            items={items}
                                            sendeAktivitaet={sendeAktivitaet}
                                            userID={userID}
                                            progress={progress}
                                            setProgress={setProgress}
                                        />
                                    </Route>
                                )
                            }
                            return (
                                <div>
                                    <h1>Not Found</h1>
                                </div>
                            )
                        })}
                        <PrivateRoute exact path="/admin">
                            <Admin userName={userName} password={password} />
                        </PrivateRoute>
                        <Route path="/Login">
                            <Login setUserName={setUserName} setPassword={setPassword} />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                ) :
                    (
                        <div className="centerContent">
                            <br />
                            <h3>Loading</h3>
                            <br />
                            <BeatLoader size={35} color="white" loading />
                        </div>
                    )}
            </div>
        </Router >
    );
}
//Gib die Ganze Applikation zurück
export default App;