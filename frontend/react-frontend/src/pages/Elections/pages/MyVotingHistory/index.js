import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {notification} from "antd";

import {getVotingHistory} from "../../../../services/election";
import Menu from "../../../../components/Menu";

import "./styles.css";


function MyVotingHistory() {
    const location = useLocation();
    const [electionList, setElectionList] = useState([]);

    const _getMyVotingHistory = () => {
        getVotingHistory()
            .then((result) => {
                setElectionList(result);
            })
            .catch((err) => {
                notification.error({message: "Error in fetching data."})
            })
    }

    useEffect(() => {
        _getMyVotingHistory();
    }, []);

    return (
        <div className="history-container">

            <Menu current_path={location.pathname}/>

            <h1>My Voting History</h1>
            {electionList.length === 0 && (
                <div>
                    <p className="entry-info">Sorry, you have not voted in any election yet!</p>
                </div>
            )}
            {electionList.map((entry, index) => (
                <div className="entry" key={index}>
                    <h2>{entry.title}</h2>
                    <p><strong>{entry.from_date}</strong> to <strong>{entry.to_date}</strong></p>
                    {entry.my_vote.map((vote, index1) => (
                        <div>
                            <p className="entry-info">Voted for {vote.title}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MyVotingHistory;
