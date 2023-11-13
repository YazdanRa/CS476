import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";


import {notification, Radio, Space} from "antd";

import {getElectionByAccessCode, recordVote} from "../../../../services/election";

import "./styles.css";
import Menu from "../../../../components/Menu";


const initialValues = {
    id: undefined,
    title: undefined,
    from_date: undefined,
    to_date: undefined,
    creator: undefined,
    vote_options: [],
}

function SurveyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const access_code = params.access_code;

    const [election, setElection] = useState(initialValues);
    const [selected_option, setSelectedOption] = useState(undefined);

    const _accessElection = () => {
        getElectionByAccessCode(access_code)
            .then((result) => {
                setElection(result);
            })
            .catch((error) => {
                notification.error({message: error.response.data.message});
                navigate("/dashboard");
            });
    }

    const _recordVote = () => {
        console.log(selected_option);
        const serialized_data = {
            selected_options: [selected_option],
        }
        recordVote(election.id, serialized_data)
            .then((result) => {
                notification.success({message: "Vote recorded successfully"});
                navigate("/dashboard");
            })
            .catch((error) => {
                notification.error({message: error.response.data.message});
            });
    }

    useEffect(() => {
        _accessElection();
    }, []);

    return (
        <div className="survey-container">

            <Menu current_path={location.pathname}/>

            <h1>Survey Name</h1>

            <p>{election.from_date} to {election.to_date} by {election.creator}</p>

            <p className="question-block">{election.title}</p>
            <Radio.Group
                value={selected_option}
                onChange={(event) => setSelectedOption(event.target.value)}
            >
                <Space direction="vertical">
                    {election.vote_options.map((vote_option, index) => (
                        <>
                            <Radio
                                value={vote_option.id}
                                checked={selected_option === vote_option.id}
                            >{vote_option.title}</Radio>
                        </>
                    ))}
                </Space>
            </Radio.Group>

            <button className="submit-button" onClick={_recordVote}>Submit</button>
        </div>
    );
}

export default SurveyPage;
