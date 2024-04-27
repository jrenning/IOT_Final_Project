import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "~/firebase/firebase";


//@ts-ignore
const AuthContext = createContext();

//@ts-ignore
export const AuthContextProvider = ({children}) => {


    const [user, setUser] = useState()

    const GoogleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    //@ts-ignore
    const EmailPasswordSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            //@ts-ignore
            setUser(currentUser)
        })

        return () => unsubscribe()
    })

    

    return (
        <AuthContext.Provider value={{user, EmailPasswordSignIn, GoogleSignIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )

    
}

export const UserAuth = () => {
    return useContext(AuthContext)
}