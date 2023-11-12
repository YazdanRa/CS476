import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, notification, QRCode} from "antd";

import {getMyElections} from "../../../../services/election";
import Menu from "../../../../components/Menu";

import './styles.css';


function MyElections() {
    const location = useLocation();
    const navigate = useNavigate();

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
                    <Link to="/elections/createElection">
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
                    <p className="entry-info entry-links">
                        Access Code:
                        <a href={`https://cs476.yazdanra.com/elections/${entry.access_code}`}>{entry.access_code}</a>
                    </p>
                    <QRCode value={`https://cs476.yazdanra.com/elections/${entry.access_code}`}/>
                    <Button type="primary" onClick={() => {
                        navigate(`myElections/${entry.id}`)
                    }}> Modify this election ></Button>

                </div>
            ))}
        </div>
    );
}

export default MyElections;
