import React from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Routes as Switch, Route} from 'react-router-dom'

import Login from "./pages/Login";
import BasePage from "./BasePage";

const Routes = () => {
    const {isAuthorized} = useSelector(
        ({auth}) => ({isAuthorized: auth.token != null}),
        shallowEqual,
    )
    return (
        <>
            {isAuthorized ? (
                <Switch>
                    <Route path="*" element={<BasePage/>}/>
                </Switch>
            ) : (
                <Login/>
            )}
        </>
    )
}

export default Routes;
