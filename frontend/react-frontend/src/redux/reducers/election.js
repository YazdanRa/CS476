import * as actionTypes from '../actions/actionTypes';

const initState = {
    elections: [],
};

function election(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_ELECTION_LIST_SUCCESS:
            return {
                ...state,
                elections: action.response,
            };
        case actionTypes.GET_ELECTION_SUCCESS:
            const index = state.elections.findIndex(
                (e) => +e.id === +action.response.id
            );

            if (index === -1) {
                return {
                    ...state,
                    elections: [...state.elections, action.response],
                };
            }
            state.elections[index] = action.response;
            return {
                ...state,
                elections: state.elections,
            };

        case actionTypes.RECORD_VOTE_SUCCESS:
            return {
                ...state,
                elections: [action.response],
            };
        default:
            return state;
    }
}

export default election;
