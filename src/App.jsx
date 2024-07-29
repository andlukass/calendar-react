import { useState } from 'react';
import EventModal from './EventModal/EventModal';
import Week from './Week/Week';
import { getMonthName } from './Week/Hours/utils/getMonthName';
import Month from './Month/Month';
import { Box, Button, Typography } from '@mui/material';
import ModeButton from './ModeButton';

function App() {

  const today = new Date();

  const baseWeek = new Date(
    today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()
  );
  
  
  const [mode, setMode] = useState("week");
  const [currentWeek, setCurrentWeek] = useState(baseWeek);

  const handleWeekChange = (front) => {
    const diff = front ? 7 : -7;
    const newWeekStart = new Date(currentWeek);
    newWeekStart.setDate(currentWeek.getDate() + diff);
    setCurrentWeek(newWeekStart)
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

  return (
    <>
      <EventModal />
      <Box sx={{display: "flex", gap: 3, m: 2, userSelect: "none"}}>
        <Button variant="outlined" onClick={()=>setCurrentWeek(baseWeek)}>Hoje</Button>
        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={()=>handleWeekChange(false)}> {"<"} </Typography>
        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={()=>handleWeekChange(true)}> {">"} </Typography>
        <Typography variant='h6' sx={{p: 0.5, width: 500}}>{getMonthName(currentWeek) + getNextMonth(currentWeek) + " " +
           getYear(currentWeek)}</Typography>
          <ModeButton mode={mode} setMode={setMode} />
      </Box>
      {mode === "week" ? <Week currentWeek={currentWeek} /> :
      <Month />}
    </>
  )
}

export default App
