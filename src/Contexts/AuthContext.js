import React, { useContext, useEffect, useState } from "react";
import AppOverlayLoader from "../Components/Helpers/Commons/Loader/AppOverlayLoader";
import { createUser, getAuth, onAuthChange, userLogout, userSignIn } from "../Helpers/App/Auth/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(getAuth()?.currentUser)

    useEffect(() => {
        const auth = getAuth();
        
        const unsubscribe = onAuthChange(auth, function () {
            setAuthUser({...auth?.authUser})
            setLoading(false)
        })

        return unsubscribe
    },[]) 


    async function signUp(...arg){
        await createUser(...arg);

        setAuthUser(getAuth().authUser)
    }

    async function signIn(...arg) {
        await userSignIn(...arg);
        setAuthUser(getAuth()?.authUser)
    }


    async function logout(...arg) {
        setLoading(true)
        await userLogout(...arg);
        
        setAuthUser({})
        setLoading(false)
    }

    const value = {
        authUser,
        signUp,
        signIn,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <AppOverlayLoader /> }
        </AuthContext.Provider>
    )
}