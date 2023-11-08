import API from '../utils/API'

const BASIC_LOGIN_URL = '/auth/token/login'
const REGISTER_URL = '/auth/token/register'
const GET_ME_URL = '/user/info'
const LOGOUT_BLACKLIST_URL = '/auth/token/logout'
const GET_REFRESH_URL = '/auth/refresh'

export const BasicLogin = (data) => {
    return API.post(BASIC_LOGIN_URL, data)
}

export const RegisterUser = (data) => {
    return API.post(REGISTER_URL, data)
}

export const GetUserByToken = () => {
    return API.get(GET_ME_URL)
}

export const LogoutBlacklist = () => {
    return API.post(LOGOUT_BLACKLIST_URL)
}

export const GetUserByRefresh = (refresh) => {
    return API.post(GET_REFRESH_URL, {refresh})
}