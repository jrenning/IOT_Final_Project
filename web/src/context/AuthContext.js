import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "~/firebase/firebase";


    const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {


    const [user, setUser] = useState()

    const GoogleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser)
        })

        return () => unsubscribe()
    })

    

    return (
        <AuthContext.Provider value={{user, GoogleSignIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )

    
}

export const UserAuth = () => {
    return useContext(AuthContext)
}