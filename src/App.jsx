import { useState } from 'react';
import EventModal from './EventModal/EventModal';
import Week from './Week/Week';
import { getMonthName } from './Week/Hours/utils/getMonthName';
import Month from './Month/Month';
import { Box, Button, Typography } from '@mui/material';
import ModeButton from './ModeButton';

function App() {
  
  const [mode, setMode] = useState("week");
  const [today, setToday] = useState(new Date());

  const handleDateChange = (front) => {
    const diff = front ? 7 : -7;
    const tempDate = new Date();
    tempDate.setDate(today.getDate() + diff);
    setToday(tempDate)
  }

  const getNextMonth = (week) => {
    const lastDay = new Date(week);
    lastDay.setDate(week.getDate() + 6);
    if (lastDay.getMonth() !== week.getMonth()) {
      return " - " + getMonthName(lastDay);
    }
    return "";
  }
  const getYear = (week) => {
    const lastDay = new Date(week);
    lastDay.setDate(week.getDate() + 6);
    if (lastDay.getMonth() !== week.getMonth()) {
      return lastDay.getFullYear();
    }
    return week.getFullYear();
  }

  const goToday = () => {
    const tempDate = new Date();
    tempDate.setSeconds(Math.random() * 60);
    setToday(tempDate);
  }

  return (
    <>
      <EventModal />
      <Box sx={{display: "flex", gap: 3, m: 2, userSelect: "none"}}>
        <Button variant="outlined" onClick={goToday}>Hoje</Button>
        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={()=>handleDateChange(false)}> {"<"} </Typography>
        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={()=>handleDateChange(true)}> {">"} </Typography>
        <Typography variant='h6' sx={{p: 0.5, width: 500}}>{getMonthName(today) + getNextMonth(today) + " " +
           getYear(today)}</Typography>
          <ModeButton mode={mode} setMode={setMode} />
      </Box>
      {mode === "week" ? <Week today={today} /> :
      <Month />}
    </>
  )
}

export default App
