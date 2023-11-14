import React from "react"
import {Route, Routes as Switch} from "react-router-dom"

import MyVotingHistory from "./pages/MyVotingHistory";
import MyElections from "./pages/MyElections";
import CreateElection from "./pages/CreateElection";
import ModifyElection from "./pages/ModifyElection";
import VotingPage from "./pages/VotingPage";
import ElectionResults from "./pages/ElectionResults";


const ElectionsPage = () => {
    return (
        <Switch>
            <Route path="/:access_code" exact element={<VotingPage/>}/>
            <Route path="/results/:id" exact element={<ElectionResults/>}/>
            <Route path="/myVotingHistory" exact element={<MyVotingHistory/>}/>
            <Route path="/myElections/:id" exact element={<ModifyElection/>}/>
            <Route path="/myElections" element={<MyElections/>}/>
            <Route path="/createElection" exact element={<CreateElection/>}/>
        </Switch>
    )
}

export default ElectionsPage;
