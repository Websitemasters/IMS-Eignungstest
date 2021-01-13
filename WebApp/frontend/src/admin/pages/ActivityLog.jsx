//Imports
import React, { useState, useEffect } from 'react';
import axios from "axios";

//Aktivitäten Log Ausführlich
export default function ActivityLog({ userName, password }) {
    //Einträge
    const [eintrage, setEintrage] = useState([]);
    //Funktion welche am Anfang des Renders einmal läuft
    useEffect(() => {
        fetchData();
    }, []);
    //Hole die Daten mit Authentication
    const fetchData = async () => {
        axios.get("/api/admin/actLog", {
            auth: {
                username: userName,
                password: password
            }
        })
            .then((response) => {
                setEintrage(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //Anzeige
    return (
        <div className="content">
            <div className="plate">
                <div className="dashBoardTitle">
                    <h1>Aktivitäten Log</h1>
                </div>
                <div className="contentInfo1">
                    <div className="actLog">
                        <div className="tableHold">
                            <table className="aktTable">
                                <thead>
                                    <tr>
                                        <th align="left">URL</th>
                                        <th align="left">Datum und Uhrzeit</th>
                                        <th align="left">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eintrage.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.vistedPage}</td>
                                            <td>{item.activityTime}</td>
                                            <td>{item.userId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
