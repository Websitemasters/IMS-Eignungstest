import React, { useState, useEffect } from 'react';
import axios from "axios";

function ActivityLog() {
    const [eintrage, setEintrage] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        axios.get("http://localhost:8080/admin/actLog")
            .then((response) => {
                setEintrage(response.data.map((item) => {
                    let realtime = item.activityTime.replace("T", ", Uhrzeit: ");
                    realtime = realtime.replace(".000+00:00", " ");
                    return {
                        ...item,
                        activityTime: realtime
                    }
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //Download statt anzeigen lieber andere Daten anzeigen lassen
    return (
        //Desgin geklaut von https://codemyui.com/css-only-mobile-friendly-table-layout/
        /*<div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Id</th>
                        <th>URL</th>
                        <th>Datum und Uhrzeit</th>
                    </tr>
                </thead>
                <tbody>
                {eintrage.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>{item.vistedPage}</td>
                        <td>{item.activityTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>*/
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
                                        <th>URL</th>
                                        <th>Datum und Uhrzeit</th>
                                        <th>User</th>
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
                <div className="contentInfo2">
                    <div className="downloadAct">
                        <button>Herunterladen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityLog
