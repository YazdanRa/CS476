import React from "react";
import {Routes as Switch, Route, Navigate} from "react-router-dom";

import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyElections from "./pages/MyElections";
import MyVotingHistory from "./pages/MyVotingHistory";

const BasePage = () => {

    return (
        <Switch>
            <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/myElections" element={<MyElections/>}/>
            <Route path="/myVotingHistory" element={<MyVotingHistory/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Switch>
    );
};

export default BasePage;
