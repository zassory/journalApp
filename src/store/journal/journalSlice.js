import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
       name: 'journal',
       initialState: {
            isSaving: false, //<------ para saber si estoy guardando o no
            messageSaved: '',
            notes: [],
            active: null,
            // active: {
            //     id: 'ABC123',
            //     title:'',
            //     body:'',
            //     date: 1234567,
            //     imageUrls: [], //Arreglo de urls // https://foto1.jpg etc
            // }
       },
       reducers: {
         savingNewNote: (state) => {
            state.isSaving = true;
         },
         addNewEmptyNote: (state,action) => {            
            state.notes.push( action.payload );
            state.isSaving = false;
         },
         setActiveNote: (state,{ payload }) => {
            state.active = payload;
            state.messageSaved = '';
         },
         setNotes: (state, { payload }) => {
            state.notes = payload;//Add to my array
         },
         setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
         },         
         noteUpdated: (state , action ) => {//payload: note
            state.isSaving = false;
            state.notes = state.notes.map(
               note => {
                  if( note.id === action.payload.id ){
                     return action.payload;
                  }
                  return note;
               });

               state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
         },
         setPhotosToActiveNote: (state,action) => {            
            state.active.imageUrls = [ ...state.active.imageUrls , ...action.payload ];
            state.isSaving = false;
         },
         clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
         },
         deleteNoteById: (state, { payload }) => {
            state.active = null;            
            state.notes = state.notes.filter( note => note.id !== payload );
         },
       }
});
// Action creators are generated for each case reducer function
export const {
        clearNotesLogout,
        savingNewNote,
        addNewEmptyNote,
        setActiveNote,
        setNotes,
        setSaving,
        setPhotosToActiveNote,
        noteUpdated,
        deleteNoteById,
    } = journalSlice.actions;