import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import Menu from "../../components/Menu";

import './styles.css';


function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="dashboard">

            <Menu current_path={location.pathname}/>

            <div className="container">

                <div className="vote-container">
                    <h2>Vote</h2>
                    <p>Enter the survey access code to vote</p>
                    <div className="input-container">
                        <input type="text" placeholder="Survey Code"/>
                        <button className="forward-button">&rarr;</button>
                    </div>
                </div>

                <div className="create-survey-container">
                    <h2>Create a Survey</h2>
                    <p>Create and share a survey</p>
                    <p className="subtext">more detail</p>
                    <button onClick={() => {
                        navigate("/elections/createElection");
                    }}>Create
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
