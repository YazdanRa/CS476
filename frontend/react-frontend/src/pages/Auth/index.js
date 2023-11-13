import React from 'react'
import {Routes as Switch, Route} from 'react-router-dom'

import OTP from "./pages/OTP";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";


const AuthenticationPage = () => {
    return (
        <Switch>
            <Route path="/*" exact element={<Login/>}/>
            <Route path="/otp" exact element={<OTP/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/logout" exact element={<Logout/>}/>
            <Route path="/signup" exact element={<Signup/>}/>
            <Route path="resetPassword" exact element={<ResetPassword/>}/>
        </Switch>
    )
}

export default AuthenticationPage;
