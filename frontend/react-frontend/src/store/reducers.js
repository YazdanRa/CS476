import {combineReducers} from 'redux'

import * as auth from './authRedux/reducer'

export const rootReducer = combineReducers({
    auth: auth.reducer,
})
