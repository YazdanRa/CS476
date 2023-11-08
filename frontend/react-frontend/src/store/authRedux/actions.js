export const actionTypes = {
    Login: '[Login] Action',
    Logout: '[Logout] Action',
    Register: '[Register] Action',
    UserRequested: '[Request User] Action',
    UserLoaded: '[Load User] Auth API',
    SetUser: '[Set User] Action',
    RefreshUser: '[Refresh User] Action',
    getRefresh: '[Refresh Access] Action',
}

export const actions = {
    login: (access, refresh) => ({
        type: actionTypes.Login,
        payload: {access, refresh},
    }),
    refresh: (access) => ({
        type: actionTypes.RefreshUser,
        payload: {access},
    }),
    register: (access) => ({
        type: actionTypes.Register,
        payload: {access},
    }),
    logout: () => ({type: actionTypes.Logout}),
    requestUser: (user) => ({
        type: actionTypes.UserRequested,
        payload: {user},
    }),
    fulfillUser: (user) => ({
        type: actionTypes.UserLoaded,
        payload: {user},
    }),
    setUser: (user) => ({type: actionTypes.SetUser, payload: {user}}),
}
