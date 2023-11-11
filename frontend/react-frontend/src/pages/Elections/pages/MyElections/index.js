import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {notification} from "antd";

import {getMyElections} from "../../../../services/election";
import Menu from "../../../../components/Menu";

import './styles.css';


function MyElections() {
    const location = useLocation();
    const [electionList, setElectionList] = useState([]);

    const _getMyElection = () => {
        getMyElections()
            .then((result) => {
                setElectionList(result);
            })
            .catch((err) => {
                notification.error({message: "Error in fetching data."})
            })
    }

    useEffect(() => {
        _getMyElection();
    }, []);

    return (
        <div className="history-container">

            <Menu current_path={location.pathname}/>

            <h1>My Elections</h1>
            {electionList.length === 0 && (
                <div>
                    <p className="entry-info">Sorry, you have not created any election yet!</p>
                    <Link to="/elections/create">
                        <button className="create-election">Create Election</button>
                    </Link>
                </div>
            )}
            {electionList.map((entry, index) => (
                <div className="entry" key={index}>
                    <h2>{entry.title}</h2>
                    <p className="entry-info">
                        <strong>From {entry.from_date}</strong> to <strong>{entry.to_date}</strong>
                    </p>
                    <p className="entry-info">Status: {entry.status}</p>
                    <p className="entry-info">Access Code: {entry.access_code}</p>

                    <div className="entry-links">
                        <a href={`/elections/${entry.id}`}>More ></a>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default MyElections;
