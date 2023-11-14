import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {notification, Space} from "antd";

import {getElectionResults} from "../../../../services/election";
import Menu from "../../../../components/Menu";

import "./styles.css";


const initialValues = {
    id: undefined,
    title: undefined,
    from_date: undefined,
    to_date: undefined,
    creator: undefined,
    vote_options: [],
}

function ElectionResults() {
    const location = useLocation();
    const params = useParams();

    const electionId = params.id;
    const [election, setElection] = useState(initialValues);

    const _getElectionResults = () => {
        getElectionResults(electionId)
            .then((result) => {
                setElection(result);
            })
            .catch((error) => {
                notification.error({message: "Error in fetching data"});
            });
    }

    useEffect(() => {
        _getElectionResults();
    }, []);

    return (
        <div className="survey-container">

            <Menu current_path={location.pathname}/>

            <h1>Survey Results</h1>

            <p>{election.from_date} to {election.to_date} by {election.creator}</p>

            <p className="question-block">{election.title}</p>
            <Space direction="vertical">
                {election.vote_options.map((vote_option, index) => (
                    <div>
                        <div>
                            <p>{vote_option.title}</p>
                            <p>{vote_option.count}</p>
                        </div>
                    </div>
                ))}
            </Space>

        </div>
    );
}

export default ElectionResults;
