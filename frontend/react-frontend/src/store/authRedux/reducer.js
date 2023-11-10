import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {actionTypes} from './actions'

const initialAuthState = {
    user: undefined,
    token: undefined,
}

export const reducer = persistReducer(
    {storage, key: 'panel-auth', whitelist: ['token', 'user']},
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                const {token, user} = action.payload
                return {token, user: user}
            }

            case actionTypes.Register: {
                const {token, user} = action.payload
                return {token, user: user}
            }

            case actionTypes.Logout: {
                storage.removeItem('persist:root')
                return initialAuthState
            }

            case actionTypes.UserLoaded: {
                const {user} = action.payload
                return {...state, user}
            }

            case actionTypes.SetUser: {
                const {user} = action.payload
                return {...state, user}
            }
            default:
                return state
        }
    },
)
