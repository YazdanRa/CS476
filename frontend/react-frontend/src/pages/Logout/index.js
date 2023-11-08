import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {LogoutBlacklist} from '../../services/auth'

import * as authActions from '../../store/authRedux/actions'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {refreshToken} = useSelector(
        ({auth}) => ({
            refreshToken: auth.refresh,
        }),
        shallowEqual,
    )

    useEffect(() => {
        LogoutBlacklist(refreshToken)
            .then((result) => {
                dispatch(authActions.actions.logout())
                navigate('/auth/token/login')
            })
            .catch((err) => {
            })
    }, [])

    return <div></div>
}

export default Logout;
