import React, {useRef, useEffect, useState} from 'react'
import {shallowEqual, useSelector, connect, useDispatch} from 'react-redux'
import {actions as authActions} from '../store/authRedux/actions'
import {GetUser, Logout} from '../services/auth'

function AuthProvider(props) {
    const didRequest = useRef(false)
    const dispatch = useDispatch()
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
            }

            return () => (didRequest.current = true)
        }

        if (!token) {
            dispatch(props.logout())
        }
    }, [token])

    return <>{props.children}</>
}

export default connect(null, authActions)(AuthProvider);