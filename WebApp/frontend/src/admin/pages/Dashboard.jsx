import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as RiIcons from "react-icons/ri";
import * as AIIcons from "react-icons/ai";

function Dashboard() {
    const [besucherAnzahl, setBesucherAnzahl] = useState();
    const [durchgefuehrte, setDurchgefuehrte] = useState();
    const [vpi, setVpi] = useState([]);
    const [testErg, setTestErg] = React.useState([]);
    const [seitenAufrufe, setSeitenAufrufe] = React.useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        //Get Seitenaufrufe
        axios.get("http://localhost:8080/api/admin/anzahlBesucher")
            .then((res) => {
                setBesucherAnzahl(res.data - 1);
            })
            .catch((error) => {
                console.log(error);
            })
        //Get Anzahl durchgeführte Tests
        axios.get("http://localhost:8080/api/admin/getDurchgefuehrte")
            .then((res) => {
                setDurchgefuehrte(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        //Get Aktivitäts Log
        axios.get("http://localhost:8080/api/admin/getVPI")
            .then((res) => {
                setVpi(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get("http://localhost:8080/api/admin/getTestErg")
            .then((res) => {
                setTestErg(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get("http://localhost:8080/api/admin/getSeitenAufrufe")
            .then((res) => {
                setSeitenAufrufe(res.data);
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
                                <h4>Anzahl Seiten aufrufe</h4>
                                <p>{seitenAufrufe}</p>
                            </div>
                        </div>
                        <div className="vpi">
                            <h2>Anzahl abbrüchen der Testdurchführung pro URL</h2>
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
                                <h2>Test Ergbisse</h2>
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

export default Dashboard