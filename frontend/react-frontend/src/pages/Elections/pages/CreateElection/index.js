import React, {useState} from 'react';
import {useLocation} from "react-router-dom";

import Menu from "../../../../components/Menu";

import './styles.css';

function NewSurvey() {
    const location = useLocation();
    const [candidates, setCandidates] = useState(['']);
    const addCandidate = () => setCandidates(prev => [...prev, '']);

    const [questions, setQuestions] = useState(['']);
    const addQuestion = () => setQuestions(prev => [...prev, '']);

    return (
        <div className="survey-container">

            <Menu current_path={location.pathname}/>

            <h1>Create Election</h1>

            <label>Title:</label>
            <div className="title-input">
                <input type="text"/>
            </div>

            <label>Candidates:</label>
            <div className="candidate-input">
                {candidates.map((_, index) => (
                    <input key={index} type="text" placeholder="Enter candidate name"/>
                ))}
            </div>
            <button onClick={addCandidate} className="add-button">+</button>

            <div className="date-inputs-container">
                <div className="from-input">
                    <label>From:</label>
                    <input type="date"/>
                </div>
            </div>

            <div className="to-input">
                <label>To:</label>
                <input type="date"/>
            </div>

            <div className="show-results">
                <label>Show result to participants after the end date: </label>
                <input type="radio" name="showResults" value="Yes"/> Yes
                <input type="radio" name="showResults" value="No"/> No
            </div>

            <div className="question-input">
                {questions.map((_, index) => (
                    <div key={index}>
                        <label>Question {index + 1}:</label>
                        <input type="text" placeholder="Enter your question"/>
                    </div>
                ))}
            </div>
            <button onClick={addQuestion} className="add-button">+</button>

            <button className="create-button">Create Survey</button>


            <button className="create-button">Create Survey</button>
        </div>
    );
}

export default NewSurvey;
