import React, { useState } from 'react';
import './CSS/SHistory.css';

function SurveyHistory() {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const historyData = [
    {
      title: "Ministry of Magic President",
      dateRange: "1950-01-01 to 1950-01-03",
      by: "Ministry of Magic",
      result: "Gellert Grindelwald"
    },
    {
      title: "Hogwarts Headmaster",
      dateRange: "1960-01-01 to 1960-03-01",
      by: "Hogwarts School of Witchcraft and Wizardry",
      result: "Albus Dumbledore"
    },
    {
      title: "Azkaban Manager",
      dateRange: "1960-01-01 to 1960-03-01",
      by: "Azkaban",
      result: "Unknown"
    }
  ];
  
  return (
    <div className="history-container">
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

        <h1>Survey History</h1>
      {historyData.map((entry, index) => (
        <div className="entry" key={index}>
          <h2>{entry.title}</h2>
          <p className="entry-info"><strong>{entry.dateRange}</strong> by {entry.by}</p>
          <p className="entry-info">Survey Result: {entry.result}</p>
          <div className="entry-links">
            <a href={`/report/${entry.title}`}>Detailed Report</a>
            <a href={`/settings/${entry.title}`}>Survey Settings</a>
          </div>
        </div>
      ))}



    </div>
);
}

export default SurveyHistory;
