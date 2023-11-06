import * as actionTypes from '../actions/actionTypes';

const initState = {
    token: null,
    user: {
        full_name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    },
    id: null,
};

function account(state = initState, action) {
    switch (action.type) {

        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                token: action.response.token
            };
        case actionTypes.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.response,
                },
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.response.token,
                user: {
                    ...state.user
                },
            };
        case actionTypes.RESET_AUTH:
            return {
                ...state,
                auth_data: {},
                user: {},
                token: null,
            };
        case actionTypes.LOGOUT_REQUEST:
            return initState;
        default:
            return state;
    }
}

export default account;
