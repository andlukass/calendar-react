import { useState } from 'react';
import EventModal from './EventModal/EventModal';
import Week from './Week/Week';
import { getMonthName } from './Week/Hours/utils/getMonthName';
import Month from './Month/Month';
import { Box, Button, Typography } from '@mui/material';
import ModeButton from './ModeButton';

function App() {

  const [mode, setMode] = useState("week");
  const [currentDate, setToday] = useState(new Date());

  const changeMode = (mode) => {
    const tempDate = new Date(currentDate);
    if (mode === "month") tempDate.setDate(15);
    if (mode === "week") tempDate.setDate(1);
    setToday(tempDate);
    setMode(mode);
  }

  const goNext = () => {
    const tempDate = new Date(currentDate);
    if (mode === "week") {
      tempDate.setDate(currentDate.getDate() + 7);
    } else {
      tempDate.setMonth(currentDate.getMonth() + 1);
    }
    setToday(tempDate);
  }

  const goPrev = () => {
    const tempDate = new Date(currentDate);
    if (mode === "week") {
      tempDate.setDate(currentDate.getDate() - 7);
    } else {
      tempDate.setMonth(currentDate.getMonth() - 1);
    }
    setToday(tempDate);
  }

  const getInitialMonth = (currentDate) => {
    const firstDay = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()
    );
    return getMonthName(firstDay)
  }

  const getNextMonth = (currentDate) => {
    const firstDay = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()
    );
    const lastDay = new Date(currentDate);
    lastDay.setDate(currentDate.getDate() + 6);
    if (lastDay.getMonth() !== firstDay.getMonth()) {
      return " - " + getMonthName(lastDay);
    }
    return "";
  }

  const getYear = () => {
    if (mode === "week") {
      const lastDay = new Date(currentDate);
      lastDay.setDate(currentDate.getDate() + 6);
      return lastDay.getFullYear();
    } else {
      return currentDate.getFullYear();
    }
  }

  const goToday = () => {
    const tempDate = new Date();
    tempDate.setSeconds(Math.random() * 60);
    if (mode === "month") tempDate.setDate(15);
    setToday(tempDate);
  }

  return (
    <>
      <EventModal />
      <Box sx={{display: "flex", gap: 3, m: 2, userSelect: "none"}}>

        <Button variant="outlined" onClick={goToday}>Hoje</Button>

        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={goPrev}>
          {"<"}
        </Typography>
        <Typography variant='h6' sx={{cursor: "pointer", p: 0.5}} onClick={goNext}>
          {">"}
        </Typography>

        <Typography variant='h6' sx={{p: 0.5, width: 500}}>
          {getInitialMonth(currentDate) + getNextMonth(currentDate) + " " +
           getYear(currentDate)}</Typography>

        <ModeButton mode={mode} changeMode={changeMode} />

      </Box>

      {mode === "week" ?
        <Week currentDate={currentDate} /> :
        <Month currentDate={currentDate} />
      }
    </>
  )
}

export default App
