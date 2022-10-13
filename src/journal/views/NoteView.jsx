import { useEffect , useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography, useFormControl } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks';
import { setActiveNote, startSaveNote } from '../../store/journal';


export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:note , messageSaved , isSaving } = useSelector( state => state.journal );

  const { body , title , date , onInputChange , formState } = useForm( note );

  //Guardo la fecha para que no se dispare ni nada salvo que cambie el date
  //Y como no cambia queda igual
  const dateString = useMemo( ()=> {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date] );

  useEffect(() => {
    //en mi formState tengo todos mis valores , uno por uno.
    dispatch(setActiveNote( formState ));
  }, [formState]); //Cuando cualquier propiedad del formState cambia
  //Hago el dispatch de una nueva accion

  useEffect(()=> {
    if( messageSaved.length > 0 ){
      Swal.fire('Nota actualizada',messageSaved, 'success');
    }
  }, [ messageSaved ]);//cuando el messageSaved cambie se dispara este efecto

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
                disabled={ isSaving }
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
