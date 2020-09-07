import * as actionTypes from './actionTypes';
import Axios from 'axios';


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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
                 console.log(res);
                 const expirationDate = new Date( new Date().getTime() + res.data.expiresIn * 1000 );
                 localStorage.setItem('token', res.data.idToken);
                 localStorage.setItem('expirationDate', expirationDate )
                 localStorage.setItem('userId', res.data.localId);
                 dispatch(authSuccess( res.data.idToken, res.data.localId ))
                 dispatch(checkauthTimeout(res.data.expiresIn))
             })
             .catch(err => {
                 dispatch(authFail(err.response.data.error))
             })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token  = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if( !token ) {
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            if(expirationDate <= new Date() ) {
                dispatch(logout())
            }else{
                dispatch(authSuccess(token, userId))
                dispatch(checkauthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}