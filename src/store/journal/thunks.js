import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

import { loadNotes } from '../../helpers/loadNotes';

import { 
        savingNewNote,
        addNewEmptyNote,
        setActiveNote,
        setNotes } from './';//<---------- slices

export const startNewNote = () => {
    return async( dispatch , getState ) => {
                
        dispatch( savingNewNote() );

        const { uid } = getState().auth;        
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection(FirebaseDB,`${ uid }/journal/notes` ) ); //Es el que tiene el id
        await setDoc(newDoc,newNote);
        
        newNote.id = newDoc.id;
                        
        dispatch( addNewEmptyNote( newNote ) );        
        dispatch( setActiveNote( newNote ));
                
    }
}

export const startLoadingNotes = () => {
    return async( dispatch , getState ) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('User Uid no exists');
        
        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );

    }
}