import React from 'react';
import './CSS/Report.css';

function SurveyReport() {
    return (
        <div className="report-container">
            <h1>Survey Report</h1>
            
            <h2>Hogwarts Headmaster</h2>
            <p>1980-01-01 to 1980-03-01 by Hogwarts School of Witchcraft and Wizardry</p>
            <p><strong>Survey Result:</strong> Harry Potter</p>
            
            <h3>Vote breakdown</h3>
            <ul>
                <li>Harry Potter: 20</li>
                <li>Ron Weasley: 15</li>
                <li>Hermione Granger: 17</li>
            </ul>
            <p><strong>Total:</strong> 52</p>
        </div>
    );
}

export default SurveyReport;
