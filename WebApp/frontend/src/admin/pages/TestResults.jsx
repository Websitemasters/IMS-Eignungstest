import React from 'react'
import axios from "axios";
import * as BiIcons from "react-icons/bi";

function TestResults() {
    const [avg, setAvg] = React.useState();
    React.useEffect(() => {
        getAvg();
    }, [])
    const getAvg = async () => {
        axios.get("http://localhost:8080/admin/getAVGTesterg")
            .then((res) => {
                setAvg(parseFloat(res.data).toFixed(2));
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
                <div className="content">
                    <div className="left">
                        <div className="avg">
                            <BiIcons.BiStats size={50} />
                            <h3>Test Durchschnitt</h3>
                            <p>{avg}</p>
                        </div>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </div>
    )
}

export default TestResults