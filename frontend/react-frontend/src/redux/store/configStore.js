import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';

import api from '../middlewares/api/api';
import rootReducer from '../reducers';

const configureStore = (preloadedState) =>
    createStore(
        rootReducer,
        { Intl: { locale: 'en' }, ...preloadedState },
        applyMiddleware(thunk, api)
    );
export default configureStore;
