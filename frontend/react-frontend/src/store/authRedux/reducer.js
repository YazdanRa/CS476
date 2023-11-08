import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {actionTypes} from './actions'

const initialAuthState = {
    user: undefined,
    access: undefined,
    refresh: undefined,
}

export const reducer = persistReducer(
    {storage, key: 'panel-auth', whitelist: ['access', 'refresh', 'user']},
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                const {access, refresh} = action.payload

                return {access, refresh, user: undefined}
            }

            case actionTypes.Register: {
                const {access} = action.payload

                return {access, user: undefined}
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
            case actionTypes.RefreshUser: {
                const {access} = action.payload
                return {...state, access}
            }
            default:
                return state
        }
    },
)
