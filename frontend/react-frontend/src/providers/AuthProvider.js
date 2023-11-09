import React, {useRef, useEffect, useState} from 'react'
import {shallowEqual, useSelector, connect, useDispatch} from 'react-redux'
import {actions as authActions} from '../store/authRedux/actions'
import {SplashScreen} from '../components'
import {GetUser, Logout} from '../services/auth'

function AuthProvider(props) {
    const didRequest = useRef(false)
    const dispatch = useDispatch()
    const [showSplashScreen, setShowSplashScreen] = useState(false)
    const {token, isAuthorized, user} = useSelector(
        ({auth}) => ({
            token: auth.token,
            isAuthorized: auth.user != null,
            userInfo: auth.user
        }),
        shallowEqual,
    )

    useEffect(() => {
        const user = async () => {
            try {
                if (!didRequest.current) {
                    const user = await GetUser()
                    dispatch(props.updateUser({...user}))
                }
            } catch (error) {
                console.log(error)
                Logout().then(
                    dispatch(props.logout())
                )
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }

        if (!token) {
            dispatch(props.logout())
            setShowSplashScreen(false)
        }
    }, [token])

    return showSplashScreen ? <SplashScreen/> : <>{props.children}</>
}

export default connect(null, authActions)(AuthProvider)
