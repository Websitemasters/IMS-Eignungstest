import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import { Link } from "react-router-dom";
import "../style/Admin.css";
import { IconContext } from "react-icons";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <div>
        <IconContext.Provider value = {{ color: "#fff" } } >
            <div className = "navbar" >
                <Link to = "#"className = "menu-bars" >
                <FaIcons.FaBars onClick = { showSidebar } size={25}/></Link>
                <h1>Admin</h1>
            </div> 
            <nav className = { sidebar ? "nav-menu active" : "nav-menu" } >
                <ul className = "nav-menu-items" onClick = { showSidebar } >
                    <li className = "navbar-toggle" >
                        <Link to = "#"className = "menu-bars" >
                            <AiIcons.AiOutlineClose size={32}/ >
                        </Link> 
                    </li> 

                    <li className="nav-text">
                        <Link to="/admin">
                            <MdIcons.MdDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/admin/log">
                            <FiIcons.FiActivity />
                            <span>Aktivitäts Log</span>
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/admin/results">
                            <IoIcons.IoIosPaper />
                            <span>Test Resultate</span>
                        </Link>
                    </li>
                </ul>
            </nav> 
        </IconContext.Provider>
    </div>
    )
}

export default Navbar
