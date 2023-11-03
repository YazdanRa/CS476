import React, { useState } from 'react';
import './CSS/Create.css';

function NewSurvey() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    }

    const [candidates, setCandidates] = useState(['']);
    const addCandidate = () => setCandidates(prev => [...prev, '']);
    
    const [questions, setQuestions] = useState(['']);
    const addQuestion = () => setQuestions(prev => [...prev, '']);

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

            <h1>New Survey</h1>

            <label>Title:</label>
            <input type="text" />

            <label>Candidates:</label>
            {candidates.map((_, index) => (
                <div key={index}>
                    <input type="text" placeholder="Enter candidate name" />
                </div>
            ))}
            <button onClick={addCandidate} className="add-button">+</button>

            <label>From:</label>
            <input type="date" />

            <label>To:</label>
            <input type="date" />

            <div className="show-results">
                <label>Show result to participants after the end date: </label>
                <input type="radio" name="showResults" value="Yes" /> Yes
                <input type="radio" name="showResults" value="No" /> No
            </div>

            {questions.map((_, index) => (
                <div key={index}>
                    <label>Question {index + 1}:</label>
                    <input type="text" placeholder="Enter your question" />
                </div>
            ))}
            <button onClick={addQuestion} className="add-button">+</button>

            <button className="create-button">Create Survey</button>
            
            
            <button className="create-button">Create Survey</button>
        </div>
    );
}

export default NewSurvey;
