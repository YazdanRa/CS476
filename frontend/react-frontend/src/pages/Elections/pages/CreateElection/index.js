import React from 'react';
import {useLocation} from "react-router-dom";

import Menu from "../../../../components/Menu";
import ElectionForm from "../../../../components/ElectionForm";

import './styles.css';


function NewSurvey() {
    const location = useLocation();

    return (
        <div className="survey-container">

            <Menu current_path={location.pathname}/>

            <h1>Create Election</h1>

            <ElectionForm/>

        </div>
    );
}

export default NewSurvey;
