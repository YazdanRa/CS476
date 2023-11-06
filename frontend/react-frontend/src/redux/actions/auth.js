import getFormData from '../../utils/getFromData';
import {CALL_API} from '../middlewares/api/api';
import * as actionTypes from './actionTypes';
import * as urls from './urls';

export const register = ({first_name, last_name, email, phone_number, password}) => ({
    [CALL_API]: {
        types: [
            actionTypes.REGISTER_REQUEST,
            actionTypes.REGISTER_SUCCESS,
            actionTypes.REGISTER_FAILURE,
        ],
        url: urls.REGISTER,
        fetchOptions: {
            method: 'POST',
            body: JSON.stringify({first_name, last_name, email, phone_number, password}),
        },
    },
    payload: {first_name, last_name, email, phone_number, password},
});

const login = ({email, password}) => ({
    [CALL_API]: {
        types: [
            actionTypes.LOGIN_REQUEST,
            actionTypes.LOGIN_SUCCESS,
            actionTypes.LOGIN_FAILURE,
        ],
        url: urls.LOGIN,
        fetchOptions: {
            method: 'POST',
            body: JSON.stringify({email, password}),
        },
    },
    payload: {email, password},
});

export const logout = () => ({
    type: actionTypes.LOGOUT_REQUEST,
});

export const resetAuth = () => ({
    type: actionTypes.RESET_AUTH,
});
