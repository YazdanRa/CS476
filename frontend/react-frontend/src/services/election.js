import API from 'utils/API'

const GET_MY_ELECTIONS = '/elections'
const CREATE_ELECTION = '/elections/create'
const GET_ELECTION = (electionId) => `/elections/${electionId}`
const RECORD_VOTE = (electionId) => `/elections/${electionId}/recordVote`

export const getMyElections = () => {
    return API.get(GET_MY_ELECTIONS)
}

export const createElection = (data) => {
    return API.post(CREATE_ELECTION, data)
}

export const getElection = (electionId) => {
    return API.get(GET_ELECTION(electionId))
}

export const recordVote = (electionId, data) => {
    return API.post(RECORD_VOTE(electionId), data)
}
