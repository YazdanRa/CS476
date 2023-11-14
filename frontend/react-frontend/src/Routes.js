import React from "react"
import {shallowEqual, useSelector} from "react-redux"

import BasePage from "./BasePage";
import Auth from "./pages/Auth";

const Routes = () => {
    const {isAuthorized} = useSelector(
        ({auth}) => ({isAuthorized: auth.token != null}),
        shallowEqual,
    )
    return (
        <>
            {isAuthorized ? (<BasePage/>) : (<Auth/>)}
        </>
    )
}

export default Routes;
