import React from 'react';
import './Vote.css';

function SurveyPage() {
    return (
        <div className="survey-container">
            <h1>Survey Name</h1>
            <p>1950-01-01 to 1950-01-03 by Ministry of Magic</p>
            
            {Array(4).fill().map((_, index) => (
                <div key={index} className="question-block">
                    <p>...?</p>
                    {["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4"].map((candidate, cIndex) => (
                        <div key={cIndex}>
                            <input type="radio" id={`q${index}-c${cIndex}`} name={`question${index}`} value={candidate} />
                            <label htmlFor={`q${index}-c${cIndex}`}>{candidate}</label>
                        </div>
                    ))}
                </div>
            ))}
            
            <button>Submit Answers</button>
        </div>
    );
}

export default SurveyPage;
