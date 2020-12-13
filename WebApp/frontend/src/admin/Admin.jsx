import React from 'react';
import "./style/Admin.css";
import Navbar from "./components/Navbar";
import Log from "./pages/ActivityLog";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/TestResults";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

function Admin() {
    return (
        <div className="admin">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/admin/log">
                        <Log />
                    </Route>
                    <Route exact path="/admin/results">
                        <Results />
                    </Route>
                    <Route exact path="/admin">
                        <Dashboard />
                    </Route>
                    <Redirect to="/admin" />
                </Switch>
            </Router>
        </div>
    )
}

export default Admin;