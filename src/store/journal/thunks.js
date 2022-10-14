import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';

import { loadNotes } from '../../helpers/loadNotes';

import {
        deleteNoteById,
        savingNewNote,
        addNewEmptyNote,
        setActiveNote,
        setNotes,
        setSaving,
        setPhotosToActiveNote,
        noteUpdated } from './';//<---------- slices

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

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc(docRef, noteToFireStore, { merge: true });//El merge es para que no guarde una nueva,
        //si no mas bien para que las actualice

        //Y aqui la actualizo en mi store
        dispatch( noteUpdated( note ) );
    }
}

export const startUploadingFiles = (files = []) => {
    return async( dispatch ) => {
        dispatch( setSaving() );//Disparo el slice, es true
        
        const fileUploadPromises = [];//Creo mi arreglo
        for (const file of files) {//Recorro el arreglo que recibo
            fileUploadPromises.push( fileUpload( file ) ); //A mi arreglo le añado lo procesado por mi helper (la url) a cada uno.
        }

        const photosUrls = await Promise.all( fileUploadPromises );//Hasta que se cumplan todas
        
        dispatch( setPhotosToActiveNote( photosUrls ) ); //disparo mi slice de setear las url de mi nota activa
    }
}

export const startDeletingNote = () => {
    return async( dispatch , getState ) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB , `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );
    }
}