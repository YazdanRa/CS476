import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Input, notification, Space} from "antd";

import Menu from "../../components/Menu";

import "./styles.css";
import {useFormik} from "formik";
import {getElectionByAccessCode} from "../../services/election";


function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const [access_code, setAccessCode] = useState("");

    const formik = useFormik({
        initialValues: {
            access_code: access_code
        },
        enableReinitialize: true,
        onSubmit: values => {
            _accessElection(values.access_code);
        },
    });

    const _accessElection = (access_code) => {
        getElectionByAccessCode(access_code)
            .then((result) => {
                // TODO: navigate to the voting page of the election!
                navigate(`/elections/${result.id}`);
            })
            .catch((error) => {
                if (error.response.status === 425) {
                    notification.error({message: error.response.data.message});
                }
            });
    }

    return (
        <div className="dashboard">

            <Menu current_path={location.pathname}/>

            <div className="container">

                <div className="vote-container">
                    <h2>Vote</h2>
                    <p>Enter the survey access code to vote</p>
                    <Space.Compact className="input-container" style={{width: "100%"}}>
                        <Input
                            placeholder="Survey Code" maxLength={8}
                            value={formik.values.access_code}
                            onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                        />
                        <Button type="primary" className="forward-button"
                                onClick={() => formik.submitForm()}>&rarr;</Button>
                    </Space.Compact>
                </div>

                <div className="create-survey-container">
                    <h2>Create a Survey</h2>
                    <p>Create and share a survey</p>
                    <p className="subtext">more detail</p>
                    <button onClick={() => {
                        navigate("/elections/createElection");
                    }}>Create
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
