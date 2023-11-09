import API from '../utils/API'

const BASIC_LOGIN_URL = '/auth/token/login'
const REGISTER_URL = '/auth/token/register'
const LOGOUT_URL = '/auth/token/logout'
const GET_ME_URL = '/user/info'

export const BasicLogin = (data) => {
    return API.post(BASIC_LOGIN_URL, data)
}

export const RegisterUser = (data) => {
    return API.post(REGISTER_URL, data)
}

export const Logout = () => {
    return API.post(LOGOUT_URL)
}

export const GetUser = () => {
    return API.get(GET_ME_URL)
}
