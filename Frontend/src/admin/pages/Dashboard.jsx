import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as RiIcons from "react-icons/ri";

function Dashboard() {
    const [aufrufe, setAufrufe] = useState();
    const [durchgefuehrte, setDurchgefuehrte] = useState();
    const [eintrage, setEintrage] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        axios.get("http://localhost:8080/admin/seitenaufrufe")
            .then((res) => {
                setAufrufe(res.data - 1);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get("http://localhost:8080/admin/getDurchgefuehrte")
            .then((res) => {
                setDurchgefuehrte(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

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
                </div>
            </div>
        </div>
    )
}

export default Dashboard
