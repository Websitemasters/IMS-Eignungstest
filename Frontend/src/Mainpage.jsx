//React Imports
import React, { useState, useEffect } from "react";
//Styles 
import "./pages/styles/styles.css";
//Components Imports
import NavBar from "./pages/components/Navbar";
import Home from "./pages/website/Home";
import Question from "./pages/questions/Question";
import Ausgabe from "./pages/questions/Ausgabe";
import TextEditor from "./pages/website/TextEditor";
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
    let initial = [];
    const [items, setItems] = useState([]);
    const [userAntworten, setUserAntworten] = useState(initial);
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
        const fetchData = await fetch("http://localhost:8080/getAllQuestion");
        const questions = await fetchData.json();
        setItems(questions);
        for (let i = 1; i <= questions.length; i++) {
            initial = [...initial, { id: i, zahl: 0 }];
        }
        setUserAntworten(initial);
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
                            <Home sendeAktivitaet={sendeAktivitaet} userID={userID} />
                        </Route>
                        <Route exact path="/Ausgabe">
                            <Ausgabe
                                userAntworten={userAntworten}
                                setUserAntworten={setUserAntworten}
                                initial={initial}
                                sendeAktivitaet={sendeAktivitaet}
                                userID={userID}
                            />
                        </Route>
                        <Route exact path="/Code">
                            <TextEditor sendeAktivitaet={sendeAktivitaet} userID={userID} />
                        </Route>
                        {items.map((item) => (
                            <Route key={item.id} exact path={`/Questions/${item.id}`}>
                                <Question
                                    name={item.question}
                                    nextPage={item.id + 1}
                                    lastPage={item.id === items.length ? "true" : "false"}
                                    userAntworten={userAntworten}
                                    setUserAntworten={setUserAntworten}
                                    sendeAktivitaet={sendeAktivitaet}
                                    userID={userID}
                                />
                            </Route>
                        ))}
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