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
import TextInputRegister from '../components/inputs/TextInputRegister';


function EventModal( ) {

  const [addEvent, editEvent] = useEventsStore((state) => [state.addEvent, state.editEvent]);

  const [event, setEvent] = useEventModalStore((state) =>
    [state.event, state.setEvent]);

  const form = useForm();

  const handleClose = () => {
    setEvent(false);
  }

  useEffect(() => {
    if (event) {
      console.log(event.start, event.end)
      const start = event.start ? event.start : 0;
      const end = event.end + 1;
      const user = event.id ? users.find((user) => user.id === event.user).name : '';
      form.setValue('id', event.id);
      form.setValue('title', event.title);
      form.setValue('day', event.day);
      form.setValue('start', getHourByIndex(start));
      form.setValue('end', getHourByIndex(end));
      form.setValue('user', user);
    }
  }, [event]);

  const onSave = () => {
    let event = form.getValues();
    event.start = (getIndexByHour(event.start));
    event.end = (getIndexByHour(event.end)-1);
    event.user = users.find((user) => user.name === event.user).id;
    if (event.id) editEvent(event);
    else {
      event.id = Math.random();
      addEvent(event);
    }
    setEvent(false);
  }

  return (
    <>
        <Modal open={event&& true} onClose={handleClose}>
            <Box sx={modalStyles}>
                <Typography><b>Titulo</b></Typography>
                <TextInputRegister fieldName='title' form={form} />
                <Typography><b>Colaborador</b></Typography>
                <AutocompleteRegister fieldName='user' options={users.map(user => user.name)} form={form} />
                <Typography><b>Data</b></Typography>
                <Typography>{form.getValues('day')}</Typography>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <AutocompleteRegister
                width={130}
                fieldName='start'
                options={hourIndexesToHours(hourIndexes)}
                form={form} />
              <Typography>até</Typography>
              <AutocompleteRegister
                width={130}
                fieldName='end'
                options={hourIndexesToHours(hourIndexes)} 
                form={form} />
                </Box>
                <Typography><b>Descrição</b></Typography>
                <TextInputRegister optional fieldName='description' form={form} />
                  <Button sx={{mt: 2}}
                  variant='contained'
                  onClick={form.handleSubmit(onSave)}>
                    Salvar
                  </Button>
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