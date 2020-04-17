import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from '../../store/actions/actionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHmmgt05rUEVRYbMig491-0Zu0ByUFz20'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHmmgt05rUEVRYbMig491-0Zu0ByUFz20'
        }

        const res = await axios.post(url, authData)
        const data = res.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }   
}

export function logout() {
    localStorage.removeItem('token', data.idToken)
    localStorage.removeItem('userId', data.localId)
    localStorage.removeItem('expirationDate', expirationDate)
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}


export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}