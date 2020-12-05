import React,{useState,useEffect} from 'react'
import axios from "axios";

function Dashboard() {
    const[aufrufe,setAufrufe] = useState();
    const[durchgefuehrte,setDurchgefuehrte] = useState();
    const[eintrage,setEintrage] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    const getData = async()=>{
        axios.get("http://localhost:8080/admin/seitenaufrufe")
        .then((res)=>{
            setAufrufe(res.data-1);
        })
        .catch((error)=>{
            console.log(error);
        })

        axios.get("http://localhost:8080/admin/getDurchgefuehrte")
        .then((res)=>{
            setDurchgefuehrte(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })

        axios.get("http://localhost:8080/admin/actLog")
        .then((response)=>{
            setEintrage(response.data.map((item)=>{
                let realtime = item.activityTime.replace("T",", Uhrzeit: ");
                realtime = realtime.replace(".000+00:00"," ");
                return {
                    ...item,
                    activityTime: realtime
                }
            }));
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div className="content">
            <div className="aufrufe">
                <h1>Seiten Aufrufe</h1>
                <br></br>
                <h3>{aufrufe}</h3>
            </div>
            <div className="durchgefuehrt">
                <h1>Durchgeführte Test</h1>
                <br/>
                <h3>{durchgefuehrte}</h3>
            </div>
            <div className="table">
                
            </div>
        </div>
    )
}

export default Dashboard
