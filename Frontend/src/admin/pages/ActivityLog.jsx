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
                setEintrage(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
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
