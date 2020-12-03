import React,{useState,useEffect} from 'react';
import axios from "axios";

function ActivityLog() {
    const[eintrage,setEintrage] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async()=>{
        axios.get("http://localhost:8080/admin/orderOld")
        .then((response)=>{
            console.log(response.data);
            setEintrage(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div className="middle">
            <ul>
            {eintrage.map((item)=>(
                <li key={item.id}>
                    <p>id: {item.id}</p>
                    <p>userid: {item.userId}</p>
                    <p>url: {item.vistedPage}</p>
                    <p>time: {item.activityTime}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default ActivityLog
