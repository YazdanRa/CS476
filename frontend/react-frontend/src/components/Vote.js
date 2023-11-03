import React, { useState } from 'react';
import './CSS/Vote.css';

function SurveyPage() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    }

    return (
        <div className="survey-container">
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

            <h1>Survey Name</h1>
            <p>1950-01-01 to 1950-01-03 by Ministry of Magic</p>
            
            {Array(4).fill().map((_, index) => (
                <div key={index} className="question-block">
                    <p className="question-block">...?</p>
                    {["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4"].map((candidate, cIndex) => (
                        <div key={cIndex}>
                            <input type="radio" id={`q${index}-c${cIndex}`} name={`question${index}`} value={candidate} />
                            <label htmlFor={`q${index}-c${cIndex}`}>{candidate}</label>
                        </div>
                    ))}
                </div>
            ))}
            
            <button className="submit-button">Submit Answers</button>
        </div>
    );
}

export default SurveyPage;
