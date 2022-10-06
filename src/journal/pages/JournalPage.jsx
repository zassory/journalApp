import { useDispatch , useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { startNewNote } from '../../store/journal';

import { NoteView } from '../views';
import { NothingSelectedView } from '../views';


//------------------------------------------------->
export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving , active } = useSelector( state => state.journal );
  

  const onClickNewNote = () => {
    dispatch (startNewNote());    
  }
  

  return (
    <JournalLayout>
            
      {/**Al principio es nulo y con eso lo transformamos a booleano */}
      {
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        disabled={ isSaving }//Esta deshabilitado cuando sea verdadero
        onClick={ onClickNewNote }
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main',opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom:50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>    
  )
}
