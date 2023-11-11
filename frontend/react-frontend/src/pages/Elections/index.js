import React from 'react'
import {Routes as Switch, Route} from 'react-router-dom'

import MyVotingHistory from "./pages/MyVotingHistory";
import MyElections from "./pages/MyElections";
import CreateElection from "./pages/CreateElection";


const ElectionsPage = () => {
    return (
        <Switch>
            <Route path="/myVotingHistory" exact element={<MyVotingHistory/>}/>
            <Route path="/myElections" exact element={<MyElections/>}/>
            <Route path="/createElection" exact element={<CreateElection/>}/>
        </Switch>
    )
}

export default ElectionsPage;

