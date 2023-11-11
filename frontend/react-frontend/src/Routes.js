import React from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Routes as Switch, Route} from 'react-router-dom'

import BasePage from "./BasePage";
import Auth from "./pages/Auth";

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
                <Auth/>
            )}
        </>
    )
}

export default Routes;
