import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from "./redux/store/configStore";

const persistedState = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : {};

const store = configureStore(persistedState);
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(
        'state',
        JSON.stringify({
            account: {...state.account, auth_data: {}},
        })
    );
});


ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
