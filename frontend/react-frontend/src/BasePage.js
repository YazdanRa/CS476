import React from "react";
import {Navigate, Route, Routes as Switch} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Elections from "./pages/Elections";
import Logout from "./pages/Auth/pages/Logout";

const BasePage = () => {

    return (
        <Switch>
            <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>

            <Route path="/elections/*" element={<Elections/>}/>
            <Route path="/auth/logout" element={<Logout/>}/>
        </Switch>
    );
};

export default BasePage;
