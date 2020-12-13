//React Imports
import React, { useState, useEffect } from "react";
//Styles 
import "./pages/styles/styles.css";
//Components Imports
import Home from "./pages/website/Home";
import Ausgabe from "./pages/items/Ausgabe";
import TextEditor from "./pages/website/TextEditor";
import OneToTen from "./pages/items/OneToTen";
import FiveChoices from "./pages/items/5Auswahl";
import Code from "./pages/items/Code";
import PrivateRoute from "./auth/PrivateRoute";
import NotFound from "./error/404";
import LoginPage from "./auth/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Axios from "axios";
import { BeatLoader } from "react-spinners";

//Admin
import "./admin/style/Admin.css";
import Log from "./admin/pages/ActivityLog";
import Dashboard from "./admin/pages/Dashboard";
import Results from "./admin/pages/TestResults";

const sendeAktivitaet = {
    sendeAktivitaet(url, id) {
        Axios.post(`http://localhost:8080/api/logActivity?id=${id}&url=${url}`)
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
                .get(`http://localhost:8080/api/addUser`)
                .then((res) => {
                    setID(res.data);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {
        Axios.get("http://localhost:8080/api/getAllItems")
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
            <br />
            {loading ? (
                <Switch>
                    <Route exact path="/">
                        <Home sendeAktivitaet={sendeAktivitaet} userID={userID} />
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
                    <PrivateRoute exact path="/admin/log">
                        <Log />
                    </PrivateRoute>
                    <PrivateRoute exact path="/admin/results">
                        <Results />
                    </PrivateRoute>
                    <PrivateRoute exact path="/admin">
                        <Dashboard />
                    </PrivateRoute>
                    <Route exact path="/404">
                        <NotFound />
                    </Route>
                    <Route exact path="/Login">
                        <LoginPage />
                    </Route>
                    <Redirect to="/404" />
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
        </Router >
    );
}

export default MainPage;