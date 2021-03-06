//Imports mit Icons
import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as RiIcons from "react-icons/ri";
import * as AIIcons from "react-icons/ai";

export default function Dashboard({ userName, password }) {
    //Daten für das Dashboard Variablen
    const [besucherAnzahl, setBesucherAnzahl] = useState();
    const [durchgefuehrte, setDurchgefuehrte] = useState();
    const [vpi, setVpi] = useState([]);
    const [testErg, setTestErg] = useState([]);
    const [seitenAufrufe, setSeitenAufrufe] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    //Hole alle Daten m,it Authentication    
    const getData = async () => {
        //Get Seitenaufrufe
        axios.get("/api/admin/anzahlBesucher", {
            auth: {
                username: userName,
                password: password
            }
        })
            .then((res) => {
                setBesucherAnzahl(res.data - 1);
            })
            .catch((error) => {
                console.log(error);
            })
        //Get Anzahl durchgeführte Tests
        axios.get("/api/admin/getDurchgefuehrte", {
            auth: {
                username: userName,
                password: password
            }
        })
            .then((res) => {
                setDurchgefuehrte(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        //Get Aktivitäts Log
        axios.get("/api/admin/getVPI", {
            auth: {
                username: userName,
                password: password
            }
        })
            .then((res) => {
                setVpi(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        //Hole die Test Ergebnisse
        axios.get("/api/admin/getTestErg", {
            auth: {
                username: userName,
                password: password
            }
        })
            .then((res) => {
                setTestErg(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        //Hole die Seiten aufrufe insgesamt
        axios.get("/api/admin/getSeitenAufrufe", {
            auth: {
                username: userName,
                password: password
            }
        })
            .then((res) => {
                setSeitenAufrufe(res.data);
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
                    <div className="title">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="content">
                    <div className="contentInfo1">
                        <div className="top">
                            <div className="besucher">
                                <RiIcons.RiUserSearchFill size={70} />
                                <h4>Anzahl Besucher</h4>
                                <p>{besucherAnzahl}</p>
                            </div>
                            <div className="durchgefuehrt">
                                <RiIcons.RiSurveyLine size={70} />
                                <h4>Durchgeführte Test</h4>
                                <p>{durchgefuehrte}</p>
                            </div>
                            <div className="seitenAufrufe">
                                <AIIcons.AiFillEye size={70} />
                                <h4>Anzahl Seitenaufrufe</h4>
                                <p>{seitenAufrufe}</p>
                            </div>
                        </div>
                        <div className="vpi">
                            <h2>Anzahl Abbrüche der Testdurchführung pro URL</h2>
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
                    <div className="contentInfo2">
                        <div className="testErgebnisse">
                            <div className="tableHold">
                                <h2>Test Ergebnisse</h2>
                                <table className="testErg">
                                    <thead>
                                        <tr>
                                            <th align="left">User</th>
                                            <th align="left">Test Ergebnis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testErg.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.testresults} %</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}