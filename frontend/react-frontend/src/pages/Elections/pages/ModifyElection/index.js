import React from 'react';
import {useLocation, useParams} from "react-router-dom";

import Menu from "../../../../components/Menu";
import ElectionForm from "../../../../components/ElectionForm";


function ModifyElection() {
    const location = useLocation();
    const params = useParams();

    return (
        <div className="survey-container">

            <Menu current_path={location.pathname}/>

            <h1>Modify Election</h1>

            <ElectionForm/>

        </div>
    );
}

export default ModifyElection;
