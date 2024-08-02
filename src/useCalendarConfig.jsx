import { useState } from 'react';

function useCalendarConfig() {

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

  const goToday = () => {
    const tempDate = new Date();
    tempDate.setSeconds(Math.random() * 60);
    if (mode === "month") tempDate.setDate(15);
    setToday(tempDate);
  }

  return {
    mode,
    currentDate,
    changeMode,
    goNext,
    goPrev,
    goToday,
  }
}

export default useCalendarConfig;
