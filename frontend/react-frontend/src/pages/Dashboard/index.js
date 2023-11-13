import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Input, Space} from "antd";

import Menu from "../../components/Menu";

import "./styles.css";
import {useFormik} from "formik";


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
            navigate(`/elections/${values.access_code}`);
        },
    });

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
