import React from 'react';
import "./style/Admin.css";
import Navbar from "./components/Navbar";
import Log from "./pages/ActivityLog";
import Dashboard from "./pages/Dashboard";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

function Admin({ userName, password }) {
    return (
        <div className="admin">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/admin/log">
                        <Log userName={userName} password={password} />
                    </Route>
                    <Route exact path="/admin">
                        <Dashboard userName={userName} password={password} />
                    </Route>
                    <Redirect to="/admin" />
                </Switch>
            </Router>
        </div>
    )
}

export default Admin;