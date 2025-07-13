import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';



const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)

const createUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}



const signIn = (email,password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth,email, password)
}

const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
}

const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
    })
}

const logOut = () => {
    setLoading(true)
    return signOut(auth)

}

useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        console.log('user in the auth state changed', currentUser)
        setLoading(false)
    })

    return () => {
        unSubscribe()
    }
},[])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;