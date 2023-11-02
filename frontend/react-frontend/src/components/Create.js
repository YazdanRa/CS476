import React from 'react';
import './CSS/Create.css';

function NewSurvey() {
    return (
        <div className="survey-form-container">
            <div className="survey-form-header">
                <h2>New Survey</h2>
                <div className="profile-section">
                    <div className="profile-icon"></div>
                    <span>▼</span>
                </div>
            </div>

            <form className="survey-form">
                <label>
                    Title:
                    <input type="text" placeholder="Enter survey title" />
                </label>

                <label>
                    Candidates:
                    <textarea placeholder="Enter candidates separated by commas"></textarea>
                </label>

                <label>
                    From:
                    <input type="date" />
                </label>

                <label>
                    To:
                    <input type="date" />
                </label>

                <label>
                    Show result to participants after the end date:
                    <div>
                        <label><input type="radio" name="showResult" value="yes" /> Yes</label>
                        <label><input type="radio" name="showResult" value="no" /> No</label>
                    </div>
                </label>

                <button type="submit">Create Survey</button>
            </form>
        </div>
    );
}

export default NewSurvey;
