import { useEffect , useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography, useFormControl } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components';

import { useForm } from '../../hooks';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:note } = useSelector( state => state.journal );

  const { body , title , date , onInputChange , formState } = useForm( note );

  const dateString = useMemo( ()=> {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date] );

  useEffect(() => {
    dispatch(setActiveNote( formState ));
  }, [formState]); //Cuando cualquier propiedad del formState cambia
  //Hago el dispatch de una nueva accion

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb:1 }}>
        <Grid item>
            <Typography
                fontSize={39}
                fontWeight='light'
            >
                { dateString }
            </Typography>
        </Grid>
        <Grid item>
            <Button 
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding:2 }}
                >
                <SaveOutlined sx={{ fontSize: 30, mr:1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió en el día de hoy?"                
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <ImageGallery />


    </Grid>
  )
}
