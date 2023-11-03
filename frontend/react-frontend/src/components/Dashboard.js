import React, { useState } from 'react';
import './CSS/Dashboard.css';

function Dashboard() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    }

    return (
        <div className="dashboard">
            <div className="dropdown">
              <button onClick={toggleMenu} className="menu-button">Menu</button>
              {showMenu && (
                <div className="menu-list">
                  <a href="#option1">Profile Setting</a>
                  <a href="#option2">Voting History</a>
                  <a href="#option3">Survey History</a>
                  <a href="#option4">Support</a>
                  <a href="#option5">Logout</a>
                </div>
              )}
            </div>

            <div className="container">
              <div className="vote-container">
                <h2>Vote</h2>
                <p>Enter the survey code and vote</p>
                <div className="input-container">
                  <input type="text" placeholder="Survey Code" />
                  <button className="forward-button">&rarr;</button>
                </div>
              </div>

              <div className="create-survey-container">
                <h2>Create a Survey</h2>
                <p>Create and share a survey</p>
                <p className="subtext">more detail</p>
                <button>Create</button>
              </div>
            </div>
        </div>
    );
}

export default Dashboard;
