//React Imports
import React, { useState, useEffect } from "react";
//Styles 
import "./pages/styles/styles.css";

//Components Imports
import NavBar from "./pages/components/Navbar";
import Home from "./pages/website/Home";
import About from "./pages/website/About";
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

const sendLocation = {
    sendLocation(url, id) {
        console.log(`user: ${id}, url: ${url}`);
        Axios.post(`http://localhost:8080/logActivity?id=${id}&url=${url}`)
            .catch((error) => {
                console.log(error);
            })
    }
};

export default function MainPage() {
    let initial = [];
    const [data, setData] = useState([]);
    const [auswahl, setAuswahl] = useState(initial);
    const [id, setID] = useState(null);
    const [loading, setLoading] = useState(false);

    const getIdFunction = async () => {
        try {
            await Axios
                .get(`http://localhost:8080/addUser`)
                .then((res) => {
                    console.log(res);
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
        setData(questions);
        console.log(questions);
        for (let i = 1; i <= questions.length; i++) {
            initial = [...initial, { id: i, zahl: 0 }];
        }
        setAuswahl(initial);
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
                            <Home sendLocation={sendLocation} id={id} />
                        </Route>
                        <Route exact path="/About">
                            <About sendLocation={sendLocation} id={id} />
                        </Route>
                        <Route exact path="/Ausgabe">
                            <Ausgabe
                                auswahl={auswahl}
                                setAuswahl={setAuswahl}
                                initial={initial}
                                sendLocation={sendLocation}
                                id={id}
                            />
                        </Route>
                        <Route exact path="/Code">
                            <TextEditor sendLocation={sendLocation} id={id} />
                        </Route>
                        {data.map((item) => (
                            <Route key={item.id} exact path={`/Questions/${item.id}`}>
                                <Question
                                    name={item.question}
                                    nextPage={item.id + 1}
                                    lastPage={item.id === data.length ? "true" : "false"}
                                    auswahl={auswahl}
                                    setAuswahl={setAuswahl}
                                    data={data}
                                    sendLocation={sendLocation}
                                    id={id}
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