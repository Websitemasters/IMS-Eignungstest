import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as RiIcons from "react-icons/ri";
import * as AIIcons from "react-icons/ai";

function Dashboard() {
    const [besucherAnzahl, setBesucherAnzahl] = useState();
    const [durchgefuehrte, setDurchgefuehrte] = useState();
    const [vpi, setVpi] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        //Get Seitenaufrufe
        axios.get("/api/admin/anzahlBesucher")
            .then((res) => {
                setBesucherAnzahl(res.data - 1);
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
        axios.get("/api/admin/getVPI")
            .then((res) => {
                setVpi(res.data);
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
                        <p>{0}</p>
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