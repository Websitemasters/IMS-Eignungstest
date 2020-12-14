import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as RiIcons from "react-icons/ri";

function Dashboard() {
    const [aufrufe, setAufrufe] = useState();
    const [durchgefuehrte, setDurchgefuehrte] = useState();
    const [eintrage, setEintrage] = useState([]);
    const [vpi, setVpi] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        //Get Seitenaufrufe
        axios.get("/api/admin/seitenaufrufe")
            .then((res) => {
                setAufrufe(res.data - 1);
            })
            .catch((error) => {
                console.log(error);
            })
        //Get Anzahl durchgeführte Tests
        axios.get("/api/admin/getDurchgefuehrte")
            .then((res) => {
                setDurchgefuehrte(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        //Get Aktivitäts Log
        axios.get("/api/admin/actLog")
            .then((response) => {
                setEintrage(response.data);

                //To Avoid Problems
                axios.get("/api/admin/getVPI")
                    .then((res) => {
                        setVpi(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className="content">
            <div className="plate">
                <div className="dashBoardTitle">
                    <div className="title">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="contentInfo1">
                    <div className="seitenAufrufe">
                        <RiIcons.RiUserSearchFill size={70} />
                        <h4>Seiten Aufrufe</h4>
                        <p>{aufrufe}</p>
                    </div>
                    <div className="durchgefuehrt">
                        <RiIcons.RiSurveyLine size={70} />
                        <h4>Durchgeführte Test</h4>
                        <p>{durchgefuehrte}</p>
                    </div>
                    <div className="letzteAkt">
                        <h3>Aktivitäten</h3>
                        <div className="aktTablePlaceHolder">
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
                    <div className="vpi">
                        <h3>Anzahl abbrüchen der Testdurchführung pro URL</h3>
                        <div className="vpiTablePlaceHolder">
                            <table className="vpiTable">
                                <thead>
                                    <tr>
                                        <th align="left">URL</th>
                                        <th align="left">Anzahl</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vpi.map((item) => (
                                        <tr key={item.url}>
                                            <td>{item.url}</td>
                                            <td>{item.anzahl}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard