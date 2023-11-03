import React, { useState } from 'react';
import './CSS/Settings.css';

function SurveySetting() {
    const [showResults, setShowResults] = useState(true);

    return (
        <div className="settings-container">
            <h1>Survey Setting</h1>
            
            <p>Survey code: x12n7e98</p>

            <label>
                Title:
                <input type="text" placeholder="Title" />
            </label>

            <label>
                Candidates:
                <input type="text" placeholder="blah" />
            </label>

            <label>
                From:
                <input type="date" />
            </label>

            <label>
                To:
                <input type="date" />
            </label>

            <div className="radio-options">
                <span>Show result to participants after the end date:</span>
                <label>
                    <input 
                        type="radio" 
                        name="showResults" 
                        checked={showResults} 
                        onChange={() => setShowResults(true)} 
                    />
                    Yes
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="showResults" 
                        checked={!showResults} 
                        onChange={() => setShowResults(false)} 
                    />
                    No
                </label>
            </div>
        </div>
    );
}

export default SurveySetting;
