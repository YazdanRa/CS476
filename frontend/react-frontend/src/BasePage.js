import React, {lazy, useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Routes as Switch, Route, Navigate} from "react-router-dom";
import {GetUserByRefresh, LogoutBlacklist} from "./services/auth";
import PageLayout from "./layout";
import {actions as authActions} from "./store/authRedux/actions";

import Logout from "./pages/Logout";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const JWTDELAY = 250000;

const BasePage = () => {
    const dispatch = useDispatch();

    const {refreshToken, accessToken} = useSelector(
        ({auth}) => ({
            refreshToken: auth.refresh,
            accessToken: auth.access,
        }),
        shallowEqual
    );

    useEffect(() => {
        try {
            const refreshAccessToken = setInterval(async () => {
                await GetUserByRefresh(refreshToken).then((res) => {
                    dispatch(authActions.refresh(res.access));
                });
            }, JWTDELAY);
            return () => {
                clearInterval(refreshAccessToken);
            };
        } catch (err) {
            if (!err.response) return;
            LogoutBlacklist(refreshToken);
            dispatch(authActions.logout());
        }
    }, []);

    return (
        <PageLayout>
            <Switch>
                <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Switch>
        </PageLayout>
    );
};

export default BasePage;
