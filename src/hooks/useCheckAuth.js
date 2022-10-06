import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

//------------------------------------------------->
export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
  
    //Además aqui si esta logeado (siempre pasa por aca)
    //Me carga las notas
    useEffect(() => {
      //Cuando el estado de la autenticacion cambia   
      onAuthStateChanged( FirebaseAuth , async( user ) => {
          if(!user) return dispatch( logout() );
  
          const { uid , email , displayName , photoURL } = user;
          dispatch( login({ uid , email , displayName , photoURL }) );
          dispatch( startLoadingNotes() );//Mi thunk
      });
    }, []);

    return status
    
}
