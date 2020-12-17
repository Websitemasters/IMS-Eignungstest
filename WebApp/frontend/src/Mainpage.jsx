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

import Admin from "./admin/Admin";
import Login from "./auth/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";

const sendeAktivitaet = {
    sendeAktivitaet(url, id) {
        Axios.post(`/api/logActivity?id=${id}&url=${url}`)
            .then((res) => {
                if (res != null) {
                    return true;
                }
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }
};

function MainPage() {
    const [items, setItems] = useState([]);
    const [userID, setID] = useState(null);
    const [loading, setLoading] = useState(true);

    const getIdFunction = async () => {
        try {
            setLoading(false);
            const cookies = document.cookie;
            const cookieArray = cookies.split('; ')
            let eignungstestLocation = -1;
            for (let i = 0; i < cookieArray.length; i++) {
                if (cookieArray[i].includes("imseignunstest")) {
                    eignungstestLocation = i;
                }
            }
            if (eignungstestLocation === -1) {
                Axios.get("/api/addUser")
                    .then((res) => {
                        let date = new Date();
                        const minutes = 30;
                        date.setTime(date.getTime() + (minutes * 60 * 1000));
                        document.cookie = "imseignunstest=" + res.data + "; expires=" + date
                        setID(res.data);
                        setLoading(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                setID(cookieArray[eignungstestLocation].substring(15, cookieArray[eignungstestLocation].length));
                setLoading(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {
        Axios.get("/api/getAllItems")
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Router>
            <div className="parent">
                <NavBar />
                <br />
                {loading ? (
                    <Switch>
                        <Route exact path="/">
                            <StartTest getIdFunction={getIdFunction} />
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
                        <PrivateRoute exact path="/admin">
                            <Admin />
                        </PrivateRoute>
                        <Route path="/Login">
                            <Login />
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
        </Router>
    );
}

export default MainPage;