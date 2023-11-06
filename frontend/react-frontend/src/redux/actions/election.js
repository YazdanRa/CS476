import {CALL_API} from '../middlewares/api/api';
import * as actionTypes from './actionTypes';
import * as urls from './urls';

export const getElection = ({electionId}) => ({
    [CALL_API]: {
        types: [
            actionTypes.GET_ELECTION_REQUEST,
            actionTypes.GET_ELECTION_SUCCESS,
            actionTypes.GET_ELECTION_FAILURE,
        ],
        url: urls.GET_ELECTION(electionId),
        fetchOptions: {
            method: 'GET',
        },
    },
});

export const getElectionList = (search) => ({
    [CALL_API]: {
        types: [
            actionTypes.GET_ELECTION_LIST_REQUEST,
            actionTypes.GET_ELECTION_LIST_SUCCESS,
            actionTypes.GET_ELECTION_LIST_FAILURE,
        ],
        url:
            urls.GET_ELECTION_LIST + (search ? '?' + new URLSearchParams(search) : ''),
        fetchOptions: {
            method: 'GET',
        },
    },
});


export const recordVote = ({selected_options}) => ({
    [CALL_API]: {
        types: [
            actionTypes.RECORD_VOTE_REQUEST,
            actionTypes.RECORD_VOTE_SUCCESS,
            actionTypes.RECORD_VOTE_FAILURE,
        ],
        url: urls.RECORD_VOTE,
        fetchOptions: {
            method: 'POST',
            body: JSON.stringify({selected_options}),
        },
    },
    payload: {selected_options},
});

