import { useMemo, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid , Link, TextField , Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

//Hooks
import { useForm } from '../../hooks';
//Mi store
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email      : '',
  password   : '',
  displayName: ''
}

const formValidations = {
   email       : [ (value) => value.includes('@'),'El correo debe de tener una @' ],
   password    : [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras' ],
   displayName : [ (value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const { status , errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);


  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData , formValidations );
  
  
  const onSubmit = ( event ) => {
    event.preventDefault();
    setformSubmitted( true );

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword( formState ) );
  }

  return (
      
        <AuthLayout title="Register" >
          <h1>FormValid: { isFormValid ? 'Valido':'Incorrecto' }</h1>
          <form 
            onSubmit={ onSubmit }
            className='animate__animated animate__fadeIn animate__faster'
            >
            <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                fullWidth
                label="Nombre completo"
                name="displayName"
                placeholder='Nombre completo'
                type="text"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
                />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                fullWidth
                label="Correo" 
                name="email"
                type="email" 
                placeholder='correo@google.com'
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
                />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
                  fullWidth                  
                  label="Contraseña"
                  name="password"
                  placeholder='Contraseña'
                  type="password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ passwordValid }
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2 , mt:1 }}>

                <Grid 
                  item 
                  xs={ 12 }
                  display={ !!errorMessage ? '' : 'none' }
                  >
                  <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>

                <Grid item xs={ 12 }>
                  <Button
                    disabled={ isCheckingAuthentication }
                    fullWidth
                    type="submit"
                    variant='contained' 
                    >
                    Crear cuenta
                  </Button>
                </Grid>                
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  Ingresar
                </Link>              
              </Grid>

            </Grid>
          </form>
        </AuthLayout>
        
       
  )
}
