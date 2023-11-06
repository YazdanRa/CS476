export const ROOT = 'https://api.cs476.yazdanra.com/';

export const REGISTER = ROOT.concat('auth/token/register');
export const LOGIN = ROOT.concat('auth/token/login');
export const LOGOUT = ROOT.concat('auth/token/logout');
export const GET_USER_INFO = ROOT.concat('user/info');


export const GET_ELECTION = (electionId) => {
    return ROOT.concat(`elections/${electionId}`);
};
export const GET_ELECTION_LIST = ROOT.concat('elections');
export const CREATE_ELECTION = ROOT.concat('elections/create');
export const RECORD_VOTE = (electionId) => {
    ROOT.concat(`elections/${electionId}/recordVote`);
};
