import API from '../utils/API'

const GET_MY_ELECTIONS_URL = '/elections/my'
const CREATE_ELECTION_URL = '/elections/create'
const GET_ELECTION_BY_ID_URL = (electionId) => `/elections/${electionId}`
const GET_ELECTION_BY_ACCESS_CODE_URL = (accessCode) => `/elections/${accessCode}`
const RECORD_VOTE_URL = (electionId) => `/elections/${electionId}/recordVote`
const VOTING_HISTORY_URL = '/elections/votingHistory'

export const getMyElections = () => {
    return API.get(GET_MY_ELECTIONS_URL)
}

export const createElection = (data) => {
    return API.post(CREATE_ELECTION_URL, data)
}

export const getElectionById = (electionId) => {
    return API.get(GET_ELECTION_BY_ID_URL(electionId))
}

export const getElectionByAccessCode = (accessCode) => {
    return API.get(GET_ELECTION_BY_ACCESS_CODE_URL(accessCode))
}

export const recordVote = (electionId, data) => {
    return API.post(RECORD_VOTE_URL(electionId), data)
}

export const getVotingHistory = () => {
    return API.get(VOTING_HISTORY_URL)
}
