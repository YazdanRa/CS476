import React from 'react';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="survey-container">
            <div className="sidebar">
                <div className="profile-icon"></div>
                <ul>
                    <li>Profile Setting</li>
                    <li>Voting History</li>
                    <li>Survey History</li>
                    <li>Support</li>
                    <li>Logout</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="card vote-card">
                    <h2>Vote</h2>
                    <p>Enter the survey code and vote</p>
                    <input type="text" placeholder="Survey Code" />
                </div>
                <div className="card create-card">
                    <h2>Create a Survey</h2>
                    <p>Create and share a survey</p>
                    <button>Create</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
