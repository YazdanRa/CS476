import React, {useRef, useEffect, useState} from 'react'
import {shallowEqual, useSelector, connect, useDispatch} from 'react-redux'
import {actions as authActions} from '../store/authRedux/actions'
import {SplashScreen} from '../components'
import {GetUserByRefresh, GetUserByToken, LogoutBlacklist} from '../services/auth'

function AuthProvider(props) {
    const didRequest = useRef(false)
    const dispatch = useDispatch()
    const [showSplashScreen, setShowSplashScreen] = useState(false)
    const {authToken, refreshToken, isAuthorized, userInfo} = useSelector(
        ({auth}) => ({
            authToken: auth.access,
            refreshToken: auth.refresh,
            isAuthorized: auth.user != null,
            userInfo: auth.user
        }),
        shallowEqual,
    )

    useEffect(() => {
        const requestUser = async () => {
            try {
                if (!didRequest.current) {
                    if (refreshToken !== undefined) {
                        // init auth
                        const access = await GetUserByRefresh(refreshToken)
                        dispatch(props.refresh(access.access))
                        const user = await GetUserByToken(userInfo.id)
                        dispatch(props.fulfillUser({...user}))
                    } else {
                        dispatch(props.logout())
                    }
                }
            } catch (error) {
                console.log(error)
                LogoutBlacklist(refreshToken)
                // dispatch(props.logout())
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }

        if (authToken) {
            requestUser()
        } else {
            dispatch(props.logout())
            setShowSplashScreen(false)
        }
    }, [refreshToken])

    return showSplashScreen ? <SplashScreen/> : <>{props.children}</>
}

export default connect(null, authActions)(AuthProvider)
