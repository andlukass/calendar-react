import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEventModalStore } from '../data/eventModal/useEventModalStore';
import { Button, Typography } from '@mui/material';
import { users } from '../data/users/users';
import { getHourByIndex } from '../Week/Hours/utils/getHourByIndex';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import AutocompleteRegister from '../components/inputs/AutocompleteRegister';
import { hourIndexes } from '../Week/Hours/utils/hourIndexes';
import { getIndexByHour } from '../Week/Hours/utils/getIndexByHour';
import { hourIndexesToHours } from '../Week/Hours/utils/hourIndexesToHours';
import { useEventsStore } from '../data/events/useEventsStore';


function EventModal( ) {

  const editEvent = useEventsStore((state) => state.editEvent);

  const [event, setEvent] = useEventModalStore((state) =>
    [state.event, state.setEvent]);

  const form = useForm();

  const handleClose = () => {
    setEvent(false);
  }

  useEffect(() => {
    if (event) {
      form.setValue('id', event.id);
      form.setValue('title', event.title);
      form.setValue('start', getHourByIndex(event.start));
      form.setValue('end', getHourByIndex(event.end));
      form.setValue('user', event.user);
    }
  }, [event]);

  const onSave = () => {
    let event = form.getValues();
    event.start = (getIndexByHour(event.start));
    event.end = (getIndexByHour(event.end));
    editEvent(event);
    console.log(event)
  }

  return (
    <>
        <Modal open={event&& true} onClose={handleClose}>
            <Box sx={modalStyles}>
             { event && <>
              <Typography variant='h5'>{event.title}</Typography>
              <Typography>{users.find((user) => user.id === event.user).name}</Typography>
              <Typography>25 de janeiro</Typography>
              <AutocompleteRegister
                width={140}
                fieldName='start'
                options={hourIndexesToHours(hourIndexes)}
                form={form} />
              <Typography>até</Typography>
              <AutocompleteRegister
                width={140}
                fieldName='end'
                options={hourIndexesToHours(hourIndexes)} 
                form={form} />
                {form.formState.isDirty &&
                  <Button sx={{mt: 2}}
                  variant='contained'
                  onClick={onSave}>
                    Salvar
                  </Button>}
              </>
              }
              </Box>
        </Modal>
    </>
  );
}

export const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 2,
  p: 4,
  outline: 'none'
};

export default EventModal;