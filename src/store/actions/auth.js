import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucced = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkauthTimeout = (expiresIn) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expiresIn
    }
}

export const auth = ( email, password, isSignUp ) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignUp
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}