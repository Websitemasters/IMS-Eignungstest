import React from 'react'
import axios from "axios";
import * as BiIcons from "react-icons/bi";

function TestResults() {
    const [avg, setAvg] = React.useState();
    const [testErg, setTestErg] = React.useState([]);
    React.useEffect(() => {
        getAvg();
        getTestErg();
    }, [])
    const getAvg = async () => {
        axios.get("/api/admin/getAVGTesterg")
            .then((res) => {
                setAvg(parseFloat(res.data).toFixed(2));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const getTestErg = async () => {
        axios.get("/api/admin/getTestErg")
            .then((res) => {
                setTestErg(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className="testResults">
            <div className="plate">
                <div className="title">
                    <h1>TestResults</h1>
                </div>
                <div className="contentInfo1">
                    <div className="avg">
                        <BiIcons.BiStats size={50} />
                        <h3>Test Durchschnitt</h3>
                        <p>{avg}</p>
                    </div>
                    <div className="contentInfo2">
                        <div className="tableHold">
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
                                            <td>{item.testresults}</td>
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

export default TestResults