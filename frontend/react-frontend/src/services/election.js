import API from "../utils/API"

const GET_MY_ELECTIONS_URL = "/elections/my"
const CREATE_ELECTION_URL = "/elections/create"
const GET_ELECTION_BY_ID_URL = (electionId) => `/elections/byID/${electionId}`
const GET_ELECTION_BY_ACCESS_CODE_URL = (accessCode) => `/elections/byAccessCode/${accessCode}`
const RECORD_VOTE_URL = (electionId) => `/elections/byID/${electionId}/recordVote`
const VOTING_HISTORY_URL = "/elections/votingHistory"
const MODIFY_ELECTION_URL = (electionId) => `/elections/byID/${electionId}/modify`
const GET_ELECTION_RESULTS_URL = (electionId) => `/elections/byID/${electionId}/results`


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

export const modifyElection = (electionId, data) => {
    return API.put(MODIFY_ELECTION_URL(electionId), data)
}

export const getElectionResults = (electionId) => {
    return API.get(GET_ELECTION_RESULTS_URL(electionId))
}
