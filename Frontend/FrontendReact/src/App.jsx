//React Imports
import React, { useState, useEffect } from "react";
//Styles and Bootstap
import "./styles/styles.css";
//import "bootstrap/dist/css/bootstrap.min.css";


//Components Imports
import NavBar from "./components/Navbar";
import Home from "./pages/website/Home";
import NotFoundPage from "./pages/error/404";
import About from "./pages/website/About";
import Question from "./pages/questions/Question";
import Ausgabe from "./pages/questions/Ausgabe";
import LoginPage from "./auth/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Axios from "axios";

const sendLocation = {
  sendLocation(url){
      console.log(url);
  }
};

export default function App() {
  let initial = [];
  const [data, setData] = useState([]);
  const [auswahl, setAuswahl] = useState(initial);

  useEffect(() => {
    fetchData();
    Axios.post("http://localhost:8080/addVisit", {
      id: 1,
      add: 1,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Post DATA");
  }, []);

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
  return (
    <Router>
      <div className="parent">
        <NavBar />
        <br />
        <Switch>
          <Route exact path="/">
            <Home sendLocation={sendLocation}/>
          </Route>
          <Route exact path="/About">
            <About sendLocation={sendLocation}/>
          </Route>
          <Route path="/Login">
            <LoginPage sendLocation={sendLocation}/>
          </Route>
          <Route exact path="/Ausgabe">
            <Ausgabe
              auswahl={auswahl}
              setAuswahl={setAuswahl}
              initial={initial} 
              sendLocation={sendLocation}
            />
          </Route>
          {data.map((item) => (
            <PrivateRoute key={item.id} exact path={`/Questions/${item.id}`}>
              <Question
                name={item.question}
                nextPage={item.id + 1}
                lastPage={item.id === data.length ? "true" : "false"}
                auswahl={auswahl}
                setAuswahl={setAuswahl}
                data={data}
                sendLocation={sendLocation}
              />
            </PrivateRoute>
          ))}
          <Route exact path="/404">
            <NotFoundPage sendLocation={sendLocation}/>
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  );
}
