export const actionTypes = {
    Login: '[Login] Action',
    Register: '[Register] Action',
    Logout: '[Logout] Action',
    UpdateUser: '[Update User] Action',
}

export const actions = {
    login: (token) => ({
        type: actionTypes.Login,
        payload: {token},
    }),
    register: (token) => ({
        type: actionTypes.Register,
        payload: {token},
    }),
    logout: () => ({
        type: actionTypes.Logout
    }),
    updateUser: (user) => ({
        type: actionTypes.UpdateUser,
        payload: {user},
    }),
}
