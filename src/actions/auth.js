import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { googleAuthProvider } from "../firebase/config"
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui"
import Swal from 'sweetalert2'


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName))
            dispatch(finishLoading())
        }).catch(e => {
            
            Swal.fire('Error', e.code, 'error');
            dispatch(finishLoading())
        })
    }
}

export const startGoogleLogin = () => {

    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName));
        })
    }
}

export const startRegisterEmailPassword = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then( async({user}) => {
            await updateProfile(user, {displayName: name})
            dispatch(login(user.uid, user.displayName))
        }).catch(e => {
           
            Swal.fire('Error', e.code, 'error');
        })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(logout());
        })
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}