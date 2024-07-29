import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEventModalStore } from '../data/eventModal/useEventModalStore';
import { Button, Typography } from '@mui/material';
import { users } from '../data/users/users';
import { getHourByIndex } from '../Week/Hours/utils/getHourByIndex';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import AutocompleteRegister from '../components/inputs/AutocompleteRegister';
import { hourIndexes } from '../Week/Hours/utils/hourIndexes';
import { getIndexByHour } from '../Week/Hours/utils/getIndexByHour';
import { hourIndexesToHours } from '../Week/Hours/utils/hourIndexesToHours';
import { useEventsStore } from '../data/events/useEventsStore';
import TextInputRegister from '../components/inputs/TextInputRegister';

import DatePickerRegister from '../components/inputs/DatePickerRegister';
import dayjs from 'dayjs';

function EventModal( ) {

  const [addEvent, editEvent] = useEventsStore((state) => [state.addEvent, state.editEvent]);

  const [event, setEvent] = useEventModalStore((state) =>
    [state.event, state.setEvent]);

  const [isLoading, setIsLoading] = useState(true);

  const form = useForm();

  const handleClose = () => {
    form.reset({
      title: '',
      user: '',
      id: '',
      date: null,
      start: '',
      end: '',
      description: '',
    });
    setEvent(false);
  }

  useEffect(() => {
    if (event) {
      const start = event.start ? event.start : 0;
      form.setValue('start', getHourByIndex(start));
    }
  }, [event]);

  useEffect(() => {
    if (event && form.getValues('start')) {
      const end = event.end + 1;
      const user = event.id ? users.find((user) => user.id === event.user).name : '';
      form.setValue('title', event.title);
      form.setValue('id', event.id);
      form.setValue('date', dayjs(event.date));
      form.setValue('end', getHourByIndex(end));
      form.setValue('user', user);
      form.setValue('description', event.description);
    }
    setIsLoading(false);
  }, [form.getValues('start')]);

  const onSave = () => {
    let event = form.getValues();
    event.start = (getIndexByHour(event.start));
    event.end = (getIndexByHour(event.end)-1);
    event.date = new Date(event.date.format('YYYY-MM-DD'));
    event.user = users.find((user) => user.name === event.user).id;
    if (event.id) editEvent(event);
    else {
      event.id = Math.random();
      addEvent(event);
    }
    setEvent(false);
  }

  const getEndOptions = (start) => {
    const startIndex = getIndexByHour(start);
    const endIndex = getIndexByHour(form.getValues('end'));
    if (startIndex >= endIndex) {
      form.setValue('end', getHourByIndex(startIndex + 1));
    }
    return hourIndexesToHours(
      Array.from({ length: 48 - startIndex }, (_, index) => index + startIndex + 1)
    );
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
        <Modal open={event&& true} onClose={handleClose}>
        <form>
            <Box sx={modalStyles}>
                <Typography><b>Titulo</b></Typography>
                <TextInputRegister fieldName='title' form={form} />
                <Typography><b>Colaborador</b></Typography>
                <AutocompleteRegister fieldName='user' options={users.map(user => user.name)} form={form} />
                <Typography><b>Data</b></Typography>
                <DatePickerRegister form={form} fieldName='date' />
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1}}>
                <AutocompleteRegister
                width={130}
                fieldName='start'
                options={hourIndexesToHours(hourIndexes)}
                form={form} />
              <Typography>até</Typography>
              <AutocompleteRegister
                width={130}
                fieldName='end'
                options={getEndOptions(form.getValues('start'))}
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
        </form>
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