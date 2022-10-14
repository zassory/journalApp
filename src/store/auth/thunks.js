import { 
    loginWithEmailPassword,
    registerUserWithEmailPassword,
    signInWithGoogle,
    logoutFirebase
} from '../../firebase/providers';
import { checkingCredentials , logout , login } from './';
import { clearNotesLogout } from '../journal';


export const checkingAuthentication = ( email , password ) => {

    return async( dispatch , getState ) => {
        dispatch( checkingCredentials() );
    }

}

export const startGoogleSignIn = () => {
    return async( dispach ) => {
        dispach( checkingCredentials() );

        const result = await signInWithGoogle();        
        if(!result.ok) return dispach( logout( result.errorMessage ) );
        delete result.ok;
        dispach( login( result ) );
        
    }
}

//Por que es asincrono
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );
        const { ok , uid , photoURL , errorMessage } = await registerUserWithEmailPassword({email,password,displayName});

        if ( !ok ) return dispatch( logout({ errorMessage }) )

        dispatch( login({ uid , displayName , email , photoURL }) );
    }
}

export const startLoginWithEmailPassword = ({ email , password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok , uid , photoURL , errorMessage , displayName } = await loginWithEmailPassword({ email , password });
        if (!ok) return dispatch( logout({ errorMessage }) );
        
        dispatch( login({ uid , displayName , email , photoURL }) );
    }
}

export const startLogout = () => {

    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }

}
