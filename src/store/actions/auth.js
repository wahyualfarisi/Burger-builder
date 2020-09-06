import * as actionTypes from './actionTypes';
import Axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( data ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: data
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
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkauthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, expiresIn * 1000 )
    }
}

export const auth = ( email, password, isSignUp ) => {
    return dispatch => {
        dispatch( authStart() )
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrMl6sEXwf3GgTruF_Nx9AFHx6cy50Vjo';
        if(!isSignUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrMl6sEXwf3GgTruF_Nx9AFHx6cy50Vjo`;
        }

        Axios.post(url, authData)
             .then(res => {
                 dispatch(authSuccess(res.data))
                 dispatch(checkauthTimeout(res.data.expiresIn))
             })
             .catch(err => {
                 dispatch(authFail(err.response.data.error))
             })
    }
}