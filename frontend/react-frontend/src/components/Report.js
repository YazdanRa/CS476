import React, {useState} from "react";
import "./CSS/Report.css";

function SurveyReport() {

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
    ];

    const voteData = [
        {
            Option1: "Harry Potter:",
            Option2: "Professor Snape:",
            Option3: "Ron Wesley:",
            Vote1: "20",
            Vote2: "15",
            Vote3: "17",
            Total: "52"
        },
    ];

    return (
        <div className="history-container">
            <div className="dropdown">
                <button onClick={toggleMenu} className="menu-button">Menu</button>
                {showMenu && (
                    <div className="menu-list">
                        <a href="/profile">Profile Setting</a>
                        <a href="/voting-history">Voting History</a>
                        <a href="/survey-history">Survey History</a>
                        <a href="/support">Support</a>
                        <a href="/logout">Logout</a>
                    </div>
                )}
            </div>

            <h1>Voting History</h1>
            {historyData.map((entry, index) => (
                <div className="entry" key={index}>
                    <h2>{entry.title}</h2>
                    <p className="entry-info"><strong>{entry.dateRange}</strong> by {entry.by}</p>
                    <p className="entry-info">Survey Result: {entry.result}</p>
                </div>
            ))}

            <h2>Voting Breakdown</h2>
            {voteData.map((entry, index) => (
                <div className="entry" key={index}>
                    <p className="entry-info"><strong>{entry.Option1}</strong> {entry.Vote1}</p>
                    <p className="entry-info"><strong>{entry.Option2}</strong> {entry.Vote2}</p>
                    <p className="entry-info"><strong>{entry.Option3}</strong> {entry.Vote3}</p>
                    <p className="entry-info">Total: {entry.Total}</p>
                </div>
            ))}


        </div>
    );
}

export default SurveyReport;
