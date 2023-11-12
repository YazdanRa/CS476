import React from 'react'
import {Routes as Switch, Route} from 'react-router-dom'

import MyVotingHistory from "./pages/MyVotingHistory";
import MyElections from "./pages/MyElections";
import CreateElection from "./pages/CreateElection";
import ModifyElection from "./pages/ModifyElection";
import ViewElection from "./pages/ViewElection";


const ElectionsPage = () => {
    return (
        <Switch>
            <Route path="/myVotingHistory" exact element={<MyVotingHistory/>}/>
            <Route path="/myElections/:id" exact element={<ModifyElection/>}/>
            <Route path="/myElections" element={<MyElections/>}/>
            <Route path="/createElection" exact element={<CreateElection/>}/>
            <Route path="/:id" exact element={<ViewElection/>}/>
        </Switch>
    )
}

export default ElectionsPage;
