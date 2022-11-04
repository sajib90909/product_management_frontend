import { AxiosGet, AxiosPost } from '../../Common/axios';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../../Common/LocalStorage";
import { API_AUTH_USER, API_LOGIN, API_LOGOUT, API_SIGNUP } from '../ApiUrl/urls';

const localStorageAuthUserKey = 'auth_user';
const localStorageAuthTokenKey = 'auth_token';

export const createUser = async (formData, finalCallback, catchCallback) => {

    await AxiosPost(API_SIGNUP, formData).then(({data}) => {
        saveUserDataToLocalStorage({authUser: data.user,token: data.token})
        
        finalCallback(data)
    }).catch((res) => {
        catchCallback(res)
    })
}


export const userSignIn = async ({email, password}, finalCallback, catchCallback) => {        
    await AxiosPost(API_LOGIN, {email, password})
    .then(({data}) => {
        saveUserDataToLocalStorage({authUser: data.user,token: data.token})
        finalCallback(data.user)
    }).catch((res) => {
        removeAuthFromLocalStorage()
        catchCallback(res)
    })
}


export const userLogout = async (callback) => {
    try {
        await AxiosPost(API_LOGOUT)
        .finally(() => {
            removeAuthFromLocalStorage()
            callback()
        })
    } catch {
        callback()
    }
    
}

export const getAuth = () => {
    return {
        authUser: getFromLocalStorage(localStorageAuthUserKey, true),
        token: getFromLocalStorage(localStorageAuthTokenKey)
    }
}

const removeAuthFromLocalStorage = () => {
    removeFromLocalStorage(localStorageAuthUserKey);
    removeFromLocalStorage(localStorageAuthTokenKey);
}

const saveUserDataToLocalStorage = (resData) => {
    saveToLocalStorage(localStorageAuthUserKey, resData?.authUser)
    saveToLocalStorage(localStorageAuthTokenKey, resData?.token)
}

export const onAuthChange = (auth, callback) => {
    return callback(auth)
}

export const checkUserLogin = async () => {
    await AxiosGet(API_AUTH_USER)
    .then(({data}) => {
        saveToLocalStorage(localStorageAuthUserKey, data)
    }).catch((res) => {
        let authUser = getAuth().authUser
        removeAuthFromLocalStorage()

        if(authUser) window.location.reload() 
    })
}



