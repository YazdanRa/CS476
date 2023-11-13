import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {notification} from "antd";

import {Logout as LogoutService} from '../../../../services/auth'
import * as authActions from '../../../../store/authRedux/actions'


const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token} = useSelector(
        ({auth}) => ({
            token: auth.token,
        }),
        shallowEqual,
    )

    useEffect(() => {
        LogoutService()
            .then((result) => {
                dispatch(authActions.actions.logout())
                navigate('/login')
                notification.success({message: "You've successfully logged out!"})
            })
            .catch((err) => {
                notification.error({message: "Oops! Something went wrong..."})
            })
    }, [])

    return <div></div>
}

export default Logout;
