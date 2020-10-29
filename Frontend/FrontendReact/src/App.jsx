//React Imports
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Axios from "axios";

//Styles and Bootstap
import "./styles/styles.css";
//import "bootstrap/dist/css/bootstrap.min.css";

//Components Imports
import NavBar from "./components/Navbar";
import Home from "./pages/website/Home";
import NotFoundPage from "./pages/error/404";
import About from "./pages/website/About";
import Quesiton from "./pages/questions/static/Questions";
import OneQuestion from "./pages/questions/static/OneQuestion";
import Question from "./pages/questions/Question";
import Ausgabe from "./pages/questions/Ausgabe";
import LoginPage from "./auth/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  let initial = [];
  const [data, setData] = useState([]);
  const [auswahl, setAuswahl] = useState(initial);

  var history = useHistory();
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
            <Home />
          </Route>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/About" component={About} />
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/QuestionStatic" component={Quesiton} />
          <Route path="/QuestionStatic/:id" component={OneQuestion} />
          <Route exact path="/Ausgabe">
            <Ausgabe
              auswahl={auswahl}
              setAuswahl={setAuswahl}
              initial={initial}
              history={history}
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
              />
            </PrivateRoute>
          ))}
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
