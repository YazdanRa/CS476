import React from "react";
import {Routes as Switch, Route, Navigate} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Elections from "./pages/Elections";
import Auth from "./pages/Auth";

const BasePage = () => {

    return (
        <Switch>
            <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>

            <Route path="/elections/*" element={<Elections/>}/>
            <Route path="/auth/*" element={<Auth/>}/>
        </Switch>
    );
};

export default BasePage;
