import React from "react";
import {Routes as Switch, Route, Navigate} from "react-router-dom";

import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const BasePage = () => {

    return (
        <Switch>
            <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Switch>
    );
};

export default BasePage;
