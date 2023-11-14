export const actionTypes = {
    Login: '[Login] Action',
    Signup: '[Signup] Action',
    Register: '[Register] Action',
    Logout: '[Logout] Action',
    getUser: '[Get User] Action',
    UpdateUser: '[Update User] Action',
}

export const actions = {
    login: (token, user) => ({
        type: actionTypes.Login,
        payload: {token, user},
    }),
    signup: (token, user) => ({
        type: actionTypes.Login,
        payload: {token, user},
    }),
    register: (token) => ({
        type: actionTypes.Register,
        payload: {token},
    }),
    logout: () => ({
        type: actionTypes.Logout
    }),
    getUser: (user) => ({
        type: actionTypes.getUser,
        payload: {user},
    }),
    updateUser: (user) => ({
        type: actionTypes.UpdateUser,
        payload: {user},
    }),
}
