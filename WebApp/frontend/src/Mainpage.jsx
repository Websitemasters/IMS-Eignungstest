//React Imports
import React, { useState, useEffect } from "react";
//Styles 
import "./pages/styles/styles.css";
//Components Imports
import NavBar from "./pages/components/Navbar";
import StartTest from "./pages/website/StartTest";
import Ausgabe from "./pages/items/Ausgabe";
import TextEditor from "./pages/website/TextEditor";
import OneToTen from "./pages/items/OneToTen";
import FiveChoices from "./pages/items/5Auswahl";
import Code from "./pages/items/Code";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Axios from "axios";
import { BeatLoader } from "react-spinners";

const sendeAktivitaet = {
    sendeAktivitaet(url, id) {
        Axios.post(`http://localhost:8080/logActivity?id=${id}&url=${url}`)
            .catch((error) => {
                console.log(error);
            })
    }
};

function MainPage() {
    const [items, setItems] = useState([]);
    const [userID, setID] = useState(null);
    const [loading, setLoading] = useState(false);

    const getIdFunction = async () => {
        try {
            await Axios
                .get(`http://localhost:8080/addUser`)
                .then((res) => {
                    setID(res.data);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {
        Axios.get("http://localhost:8080/getAllItems")
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        fetchData();
        getIdFunction();
    }, []);
    return (
        <Router>
            <div className="parent">
                <NavBar />
                <br />
                {loading ? (
                    <Switch>
                        <Route exact path="/">
                            <StartTest sendeAktivitaet={sendeAktivitaet} userID={userID} />
                        </Route>
                        <Route exact path="/Ausgabe">
                            <Ausgabe
                                items={items}
                                sendeAktivitaet={sendeAktivitaet}
                                userID={userID}
                            />
                        </Route>
                        <Route exact path="/Code">
                            <TextEditor sendeAktivitaet={sendeAktivitaet} userID={userID} />
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
        </Router>
    );
}

export default MainPage;