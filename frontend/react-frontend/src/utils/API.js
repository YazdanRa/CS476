import {notification} from 'antd'
import axios from 'axios'
import qs from 'qs'

import {actions} from '../store/authRedux/actions'
import {GetUserByRefresh, LogoutBlacklist} from '../services/auth'

let store
const URLBlacklist = ['/auth']
const ENTRY_ROUTE = '/auth'

export const setUpInterceptorStore = (_store) => {
    store = _store
}

const API = axios.create({
    baseURL: 'https://api.cs476.yazdanra.com',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
        return qs.stringify(params, {
            arrayFormat: 'repeat',
        })
    },
})

// API Request interceptor
API.interceptors.request.use(
    (config) => {
        const access_token = store.getState().auth.access

        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`
        }

        return config
    },
    (error) => {
        notification.error({
            message: 'Error',
        })
        Promise.reject(error)
    },
)

// API response interceptor
API.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (!error.response) {
            notification.error({
                message: 'Network Error',
            })
        }

        // Remove token and redirect
        else if (error.response.status === 403 || error.response.status === 401) {
            return new Promise(async function (resolve, reject) {
                const refreshToken = store.getState().auth.refresh
                try {
                    URLBlacklist.find((url) => url.includes(error.config.url))
                        ? await GetUserByRefresh(refreshToken).then((res) => {
                            store.dispatch(actions.refresh(res.access)).then((result) => {
                                return API.request(error.config)
                            })
                        })
                        : resolve()
                } catch (err) {
                    LogoutBlacklist(refreshToken)
                    store.dispatch(actions.logout())
                    notification.error({
                        message: 'Authorization Error. Login Again',
                    })
                    reject()
                }
            })
        } else if (error.response.status === 404) {
            notification.error({
                message: 'Requested Data Not Found',
            })
        } else if (error.response.status === 429) {
            notification.error({
                message: 'Too Many Requests. Please Try Again Later',
            })
        } else if (error.response.status === 500) {
            notification.error({
                message: 'Server Error',
            })
        } else if (error.response.status === 508) {
            notification.error({
                message: 'Timeout Error',
            })
        }

        return Promise.reject(error)
    },
)

export default API;
